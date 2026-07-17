<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $company = strip_tags(trim($_POST["company"]));
    $message = strip_tags(trim($_POST["message"]));
    $turnstileResponse = $_POST['cf-turnstile-response'] ?? '';

    // Turnstile Verification
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
        header("Location: index.html?status=captcha-error#contact");
        exit;
    }

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Lütfen formu eksiksiz doldurun.";
        exit;
    }

    $apiKey = "rm_live_7b37ddcd28d669fe8b3eab53b293c8ff27a7f9313aa67a65";
    $apiUrl = "https://redmail.e42art.com/api/v1/send";

    $data = [
        "to" => "emre@ad.com.tr",
        "reply_to" => $email,
        "subject" => "Yeni İletişim Formu Mesajı: $name",
        "body" => "
            <h2>Yeni İletişim Formu Mesajı</h2>
            <p><strong>Ad Soyad:</strong> $name</p>
            <p><strong>E-posta:</strong> $email</p>
            <p><strong>Şirket:</strong> $company</p>
            <p><strong>Mesaj:</strong><br>$message</p>
        "
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
        header("Location: index.html?status=success#contact");
    } else {
        header("Location: index.html?status=error#contact");
    }
} else {
    header("Location: index.html");
}
?>
