<?php
// Mr. Falcon Beauty — contact form handler (OpenLiteSpeed compatible)
// Physical endpoint at /api/contact (no rewrite needed).
// RedMail API key + recipients injected at deploy time into
// ../server/config.php (document-root OUTSIDE, web-inaccessible).

require_once dirname(__DIR__, 2) . "/server/config.php";

function send_json(int $status, array $body): void {
    http_response_code($status);
    header("content-type: application/json; charset=utf-8");
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function escape_html(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, "UTF-8");
}

if ($_SERVER["REQUEST_METHOD"] !== "POST" || strtok($_SERVER["REQUEST_URI"], "?") !== "/api/contact") {
    send_json(404, ["ok" => false, "error" => "not found"]);
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data)) {
    send_json(400, ["ok" => false, "error" => "Geçersiz istek."]);
}

$name = trim(strval($data["name"] ?? ""));
$email = trim(strval($data["email"] ?? ""));
$phone = trim(strval($data["phone"] ?? ""));
$message = trim(strval($data["message"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    send_json(400, ["ok" => false, "error" => "Eksik alanlar."]);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(400, ["ok" => false, "error" => "Geçersiz e-posta."]);
}

$html = "
<div style=\"font-family:Inter,Arial,sans-serif;color:#0b1220\">
  <h2 style=\"font-family:Playfair Display,serif\">Yeni İletişim Formu Mesajı</h2>
  <p><strong>Ad:</strong> " . escape_html($name) . "</p>
  <p><strong>E-posta:</strong> " . escape_html($email) . "</p>
  <p><strong>Telefon:</strong> " . escape_html($phone) . "</p>
  <p><strong>Mesaj:</strong></p>
  <p>" . nl2br(escape_html($message)) . "</p>
</div>";

$payload = [
    "to" => REDMAIL_TO,
    "cc" => REDMAIL_CC !== "" ? array_filter(array_map("trim", explode(",", REDMAIL_CC))) : [],
    "reply_to" => $email,
    "subject" => "İletişim Formu: " . $name,
    "body" => $html,
];

$ch = curl_init(REDMAIL_URL);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "content-type: application/json",
        "X-API-KEY: " . REDMAIL_API_KEY,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_TIMEOUT => 15,
]);
$resp = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($resp === false || $http_code < 200 || $http_code >= 300) {
    send_json(502, ["ok" => false, "error" => "E-posta gönderilemedi.", "detail" => $err ?: substr($resp ?: "", 0, 500)]);
}

send_json(200, ["ok" => true]);
