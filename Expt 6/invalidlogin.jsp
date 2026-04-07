<!DOCTYPE html>
<html>
<head>
<title>Invalid Login</title>

<style>
body{
    margin:0;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#4facfe,#00f2fe);
    font-family:'Segoe UI',sans-serif;
}

.login-box{
    background:white;
    padding:30px;
    width:320px;
    border-radius:12px;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
    text-align:center;
}

.login-box h2{
    margin-bottom:10px;
    color:#ff4b5c;
}

p{
    color:#555;
}

a{
    display:inline-block;
    margin-top:15px;
    padding:10px 20px;
    background:#4facfe;
    color:white;
    text-decoration:none;
    border-radius:8px;
    transition:0.3s;
}

a:hover{
    background:#00c6ff;
}
</style>

</head>

<body>

<div class="login-box">
    <h2>Invalid Login</h2>
    <p>Incorrect username or password</p>
    <a href="login.html">Try Again</a>
</div>

</body>
</html>