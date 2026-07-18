<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Yalnızca POST istekleri kabul edilir."]);
    exit;
}

// Accept both FormData and JSON body
$input = $_POST;
if (empty($input)) {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);
    if (is_array($json)) {
        $input = $json;
    }
}

// Required fields
$name = strip_tags(trim($input["name"] ?? ''));
$phone = strip_tags(trim($input["phone"] ?? ''));

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Ad Soyad ve Telefon zorunludur."]);
    exit;
}

// Turnstile Verification (optional — skip if empty for testing)
$turnstileResponse = $input['cf-turnstile-response'] ?? '';

if ($turnstileResponse !== '') {
    $secretKey = "0x4AAAAAAAe3UYEBfAD0SXIcnrxgL5SgzNM";

    $chVerify = curl_init();
    curl_setopt($chVerify, CURLOPT_URL, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    curl_setopt($chVerify, CURLOPT_POST, true);
    curl_setopt($chVerify, CURLOPT_POSTFIELDS, http_build_query([
        "secret" => $secretKey,
        "response" => $turnstileResponse
    ]));
    curl_setopt($chVerify, CURLOPT_RETURNTRANSFER, true);

    $verifyResponse = curl_exec($chVerify);
    $curlError = curl_error($chVerify);
    $verifyResult = json_decode($verifyResponse, true);
    curl_close($chVerify);

    if ($curlError || !($verifyResult['success'] ?? false)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Doğrulama başarısız. Lütfen tekrar deneyin."]);
        exit;
    }
}

// Optional fields
$email = filter_var(trim($input["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$clinic = strip_tags(trim($input["clinic"] ?? ''));
$concern = strip_tags(trim($input["concern"] ?? ''));
$message = strip_tags(trim($input["message"] ?? ''));
$form_type = strip_tags(trim($input["form_type"] ?? 'appointment'));
$kvkk = $input["kvkk"] ?? '';

// Build HTML email
$rows = "";
$rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>Ad Soyad</td><td style='padding:8px 12px;border:1px solid #ddd'>$name</td></tr>";
$rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>Telefon</td><td style='padding:8px 12px;border:1px solid #ddd'>$phone</td></tr>";
if ($email) {
    $rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>E-posta</td><td style='padding:8px 12px;border:1px solid #ddd'>$email</td></tr>";
}
if ($clinic) {
    $rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>Şube</td><td style='padding:8px 12px;border:1px solid #ddd'>$clinic</td></tr>";
}
if ($concern) {
    $rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>İlgi Alanı</td><td style='padding:8px 12px;border:1px solid #ddd'>$concern</td></tr>";
}
if ($message) {
    $rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>Mesaj</td><td style='padding:8px 12px;border:1px solid #ddd'>" . nl2br($message) . "</td></tr>";
}
$rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>Form Tipi</td><td style='padding:8px 12px;border:1px solid #ddd'>$form_type</td></tr>";
$rows .= "<tr><td style='padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9'>KVKK Onayı</td><td style='padding:8px 12px;border:1px solid #ddd'>" . ($kvkk ? "Onaylandı" : "Onaylanmadı") . "</td></tr>";

$body = "
    <h2 style='color:#333'>Yeni Randevu Talebi</h2>
    <table style='border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px'>
        $rows
    </table>
";

$apiKey = "rm_live_7b37ddcd28d669fe8b3eab53b293c8ff27a7f9313aa67a65";
$apiUrl = "https://redmail.e42art.com/api/v1/send";

$data = [
    "to" => "emre@ad.com.tr",
    "reply_to" => $email ?: "noreply@mrfalcon.com",
    "subject" => "Yeni Randevu Talebi: $name",
    "body" => $body
];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-API-KEY: $apiKey"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["success" => true, "message" => "Randevu talebiniz alındı! 15 dakika içinde size dönüş yapacağız."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Gönderim sırasında bir hata oluştu. Lütfen WhatsApp'tan iletişime geçin."]);
}
