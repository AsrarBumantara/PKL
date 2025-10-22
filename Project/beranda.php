<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
$conn = new mysqli("localhost", "root", "", "weba");
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
$user_id = $_SESSION['user_id'];
$sql = "SELECT username, email FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Css/beranda.css">
    <title>Beranda</title>
</head>
<body>
    <div class="container"><center><h1>Selamat Datang</h1>
    <a href="beranda.php">Home</a>
    <a href="about.html">About</a>
    <a href="Login.html">Login</a>
    <a href="Register.html">Daftar</a></center>
    <h1>Newest Post</h1>
    <h3>First Post</h3>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, dicta quod! Corrupti, ipsum iste. Ullam reiciendis quisquam laudantium accusamus iste. Perspiciatis, maiores qui eligendi quia voluptate perferendis mollitia delectus exercitationem doloribus. Dignissimos dolores veniam excepturi quos repellendus natus, quas ipsam ullam, ratione ad soluta sit aut accusamus dolorem fuga! Necessitatibus.</p>
    <h3>About me</h3>
    <img src="https://th.bing.com/th/id/ODL.4b1c64495f48846c936c0d84e3f6d26e?w=152&h=183&c=10&rs=1&o=6&pid=AlgoBlockDebug" alt="">
    <script src="Script/Interactive.js"></script>
</body>
</html>
