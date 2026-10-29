<?php
/**
 * Contact form endpoint: receives the JSON POST from ContactForm.tsx and sends it
 * through Hostinger SMTP (smtp.hostinger.com) with PHPMailer.
 *
 * Secrets live in contact-config.php OUTSIDE public_html (never in Git).
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(int $code, array $body): never
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// ---- config (one folder above public_html) --------------------------------
$configFile = dirname(__DIR__, 2) . '/contact-config.php';
if (!is_file($configFile)) {
    error_log('contact.php: missing ' . $configFile);
    reply(500, ['ok' => false, 'error' => 'not_configured']);
}
$cfg = require $configFile;

// ---- only POST from our own site ------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method_not_allowed']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $cfg['allowed_origins'], true)) {
    reply(403, ['ok' => false, 'error' => 'forbidden_origin']);
}

// ---- simple rate limit: 5 messages per IP every 10 minutes ----------------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/taif_contact_' . hash('sha256', $ip);
$now = time();
$hits = is_file($rlFile) ? (json_decode((string) file_get_contents($rlFile), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > $now - 600));
if (count($hits) >= 5) {
    reply(429, ['ok' => false, 'error' => 'too_many_requests']);
}

// ---- read + validate the body ----------------------------------------------
$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'invalid_json']);
}

$clean = static fn($v, int $max) => mb_substr(trim(str_replace(["\r", "\0"], '', (string) ($v ?? ''))), 0, $max);
$name    = $clean($data['name'] ?? '', 100);
$email   = $clean($data['email'] ?? '', 150);
$company = $clean($data['company'] ?? '', 150);
$service = $clean($data['service'] ?? '', 60);
$message = $clean($data['message'] ?? '', 5000);
$lang    = ($data['language'] ?? '') === 'en' ? 'en' : 'ar';

if ($name === '' || $message === '' || $service === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, ['ok' => false, 'error' => 'invalid_fields']);
}
// header-injection guard for single-line fields
foreach ([$name, $email, $company, $service] as $f) {
    if (str_contains($f, "\n")) {
        reply(422, ['ok' => false, 'error' => 'invalid_fields']);
    }
}

// ---- send -----------------------------------------------------------------
$h = static fn(string $s) => nl2br(htmlspecialchars($s, ENT_QUOTES, 'UTF-8'));
$rows = [
    'الاسم / Name'        => $name,
    'البريد / Email'      => $email,
    'الشركة / Company'    => $company !== '' ? $company : '—',
    'الخدمة / Service'    => $service,
    'لغة الموقع / Lang'   => $lang,
];
$table = '';
foreach ($rows as $k => $v) {
    $table .= '<tr><th style="text-align:right;padding:6px 10px;background:#F4EFE6">' . $k
        . '</th><td style="padding:6px 10px">' . $h($v) . '</td></tr>';
}
$html = '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:14px;color:#131B2E">'
    . '<h2 style="color:#1E7F72">رسالة جديدة من نموذج التواصل</h2>'
    . '<table style="border-collapse:collapse;border:1px solid #ddd">' . $table . '</table>'
    . '<h3>الرسالة</h3><p>' . $h($message) . '</p></div>';
$text = "رسالة جديدة من نموذج التواصل\n\n";
foreach ($rows as $k => $v) {
    $text .= "$k: $v\n";
}
$text .= "\n$message\n";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $cfg['smtp_host'];
    $mail->Port       = (int) $cfg['smtp_port'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['smtp_user'];
    $mail->Password   = $cfg['smtp_pass'];
    $mail->SMTPSecure = (int) $cfg['smtp_port'] === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet    = 'UTF-8';
    $mail->Timeout    = 15;

    $mail->setFrom($cfg['smtp_user'], $cfg['from_name']);   // must be the SMTP mailbox itself
    $mail->addAddress($cfg['to_email']);
    $mail->addReplyTo($email, $name);                        // "Reply" goes to the visitor

    $mail->isHTML(true);
    $mail->Subject = 'رسالة من الموقع: ' . $name . ($company !== '' ? " ($company)" : '');
    $mail->Body    = $html;
    $mail->AltBody = $text;
    $mail->send();
} catch (MailException $e) {
    error_log('contact.php SMTP error: ' . $mail->ErrorInfo);
    reply(502, ['ok' => false, 'error' => 'send_failed']);
}

$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits));
reply(200, ['ok' => true]);
