<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

function field(string $key): string
{
    return trim((string) ($_POST[$key] ?? ''));
}

function clean_header(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

if (field('company') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name = clean_header(field('name'));
$email = clean_header(field('email'));
$project = clean_header(field('project'));
$message = field('message');
$source = clean_header(field('source'));

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please provide a valid name and email.']);
    exit;
}

$recipients = [
    'sales@melighting.com.au',
    'shiv@proairmarketing.com.au',
];

$subject = clean_header('ME Lighting enquiry' . ($project !== '' ? ': ' . $project : ''));
$body = "New website enquiry\n\n";
$body .= 'Source: ' . ($source !== '' ? $source : 'Website form') . "\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= 'Project type: ' . ($project !== '' ? $project : 'Not specified') . "\n";
$body .= "Message:\n" . ($message !== '' ? $message : 'No message provided.') . "\n";

$boundary = 'bnd_' . bin2hex(random_bytes(12));
$headers = [
    'From: ME Lighting Website <noreply@melighting.com.au>',
    "Reply-To: {$name} <{$email}>",
    'MIME-Version: 1.0',
    "Content-Type: multipart/mixed; boundary=\"{$boundary}\"",
];

$mime = "--{$boundary}\r\n";
$mime .= "Content-Type: text/plain; charset=UTF-8\r\n";
$mime .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mime .= $body . "\r\n";

$file = $_FILES['attachment'] ?? null;
if (is_array($file) && (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
    $allowed = [
        'pdf' => 'application/pdf',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
    ];
    $ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    $size = (int) ($file['size'] ?? 0);
    if (isset($allowed[$ext]) && $size > 0 && $size <= 8 * 1024 * 1024) {
        $filename = clean_header(str_replace('"', '', basename((string) $file['name'])));
        $data = chunk_split(base64_encode((string) file_get_contents($file['tmp_name'])));
        $mime .= "--{$boundary}\r\n";
        $mime .= "Content-Type: {$allowed[$ext]}; name=\"{$filename}\"\r\n";
        $mime .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n";
        $mime .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $mime .= $data . "\r\n";
    }
}

$mime .= "--{$boundary}--\r\n";
$headerString = implode("\r\n", $headers);

$sent = 0;
foreach ($recipients as $to) {
    if (@mail($to, $subject, $mime, $headerString)) {
        $sent++;
    }
}

if ($sent < count($recipients)) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Unable to send enquiry.']);
    exit;
}

echo json_encode(['ok' => true]);
