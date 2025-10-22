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
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $identitas = $_POST['email'] ?? ''; // bisa email atau username
    $password = $_POST['password'] ?? '';
    // Cek user berdasarkan email atau username
    $sql = "SELECT id, username, email, password_hash FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $identitas, $identitas);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Verifikasi password dengan password_verify()
        if (password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            header("Location: ../publik/beranda.php");
            exit;
        } else {
            echo "❌ Password salah!";
        }
    } else {
        echo "❌ Email atau username tidak ditemukan.";
    }
    $stmt->close();
    $conn->close();
}
?>