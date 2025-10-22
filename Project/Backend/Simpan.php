<?php
session_start();
$conn = new mysqli("localhost", "root", "", "weba");
error_log("Session ID: " . session_id());
error_log("CSRF Token in Session: " . ($_SESSION['csrf_token'] ?? 'NOT SET'));
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    error_log("New CSRF Token Generated: " . $_SESSION['csrf_token']);
}
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    echo "Token keamanan tidak valid!";
    exit;
}
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Fofmat email tidak valid!";
    exit;
}
if (strlen($nama) < 3 || strlen($nama) > 50) {
    echo "Nama harus antara 3 hingga 50 karakter!";
    exit;
}
if (strlen($password) < 8) {
    echo "Password harus minimal 8 karakter!";
    exit;
}
$nama = $_POST['nama'];
$email = $_POST['email'];
$password = $_POST['password'];
$konfirmasi = $_POST['konfirmasi'];
if ($password !== $konfirmasi) {
    echo "Password dan konfirmasi tidak cocok!";
    exit;
}
$check = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$check->bind_param("ss", $nama, $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    echo "Username atau Email sudah terdaftar. Silakan gunakan yang lain.";
    exit;
}
$check->close();
$options = ['cost' => 12];
$passwordHash = password_hash($password, PASSWORD_DEFAULT, $options);
$stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nama, $email, $passwordHash);
if ($stmt->execute()) {
    $user_id = $stmt->insert_id;
    $_SESSION['user_id'] = $user_id;
    header("Location: ../publik/beranda.php");
    exit;
} else {
    error_log("Registrasi gagal: " . $stmt->error);
    echo "Terjadi kesalahan sistem. Silakan coba lagi.";
}
$stmt->close();
$conn->close();
?>