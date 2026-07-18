<?php
// Classic PHP form POST handler — supports both AJAX (JSON) and regular form POST (redirect)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$isAjax = !empty($_POST['_ajax']);
$referer = $_SERVER['HTTP_REFERER'] ?? '/iletisim';

function respond($isAjax, $referer, $success, $message) {
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode(["success" => $success, "message" => $message]);
        exit;
    }
    $sep = (strpos($referer, '?') === false) ? '?' : '&';
    $param = $success ? "status=success" : "status=error&message=" . urlencode($message);
    header("Location: {$referer}{$sep}{$param}");
    exit;
}

// Required fields
$name = strip_tags(trim($_POST["name"] ?? ''));
$phone = strip_tags(trim($_POST["phone"] ?? ''));

if (empty($name) || empty($phone)) {
    respond($isAjax, $referer, false, "Ad Soyad ve Telefon zorunludur.");
}

// Turnstile Verification (optional — skip if empty for testing)
$turnstileResponse = $_POST['cf-turnstile-response'] ?? '';

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
        respond($isAjax, $referer, false, "Doğrulama başarısız. Lütfen tekrar deneyin.");
    }
}

// Optional fields
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$clinic = strip_tags(trim($_POST["clinic"] ?? ''));
$concern = strip_tags(trim($_POST["concern"] ?? ''));
$message = strip_tags(trim($_POST["message"] ?? ''));
$form_type = strip_tags(trim($_POST["form_type"] ?? 'appointment'));
$kvkk = $_POST["kvkk"] ?? '';

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
    respond($isAjax, $referer, true, "Randevu talebiniz alındı! 15 dakika içinde size dönüş yapacağız.");
} else {
    respond($isAjax, $referer, false, "Gönderim sırasında bir hata oluştu. Lütfen WhatsApp'tan iletişime geçin.");
}
