<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Css/Register.css">
    <title>Register dog</title>
</head>
<body>
    <form id="registerForm" action="../Backend/Simpan.php" method="post">
        <center>
            <h3>Form Register</h3>
        </center>
        <input type="text" name="nama" placeholder="Masukan nama" required>
        <input type="email" name="email" placeholder="Masukan email" required>
        <input type="password" name="password" placeholder="Masukan password" required>
        <input type="password" name="konfirmasi" placeholder="Konfirmasi password" required>
        <input type="hidden" name="csrf_token" value="<?php echo isset($_SESSION['csrf_token']) ? $_SESSION['csrf_token'] : ''; ?>">
        <center><button type="submit">DAFTAR</button></center>
    </form>
    <center>
        <h4>Atau</h4>
    </center>
    <footer>
        <center>
            <p>Sudah punya akun? <a href="Login.html" class="loginaja">Login</a></p>
        </center>
    </footer>
    <!--<script src="Script/Interactive.js"></script>-->
</body>
</html>
