<%@ page import="jakarta.servlet.http.*" %>
<%
    HttpSession session1 = request.getSession(false);

    if(session1 == null || session1.getAttribute("user") == null){
        response.sendRedirect("login.html");
        return;
    }

    String username = (String)session1.getAttribute("user");
%>

<html>
<head>
<title>Home</title>

<style>
body{
    margin:0;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#43e97b,#38f9d7);
    font-family:'Segoe UI',sans-serif;
}

.card{
    background:white;
    padding:40px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

h2{
    color:#333;
}

a{
    display:inline-block;
    margin-top:20px;
    padding:10px 20px;
    background:#ff4b5c;
    color:white;
    text-decoration:none;
    border-radius:8px;
    transition:0.3s;
}

a:hover{
    background:#ff1e3c;
}
</style>

</head>

<body>

<div class="card">
    <h2>Welcome <%= username %> </h2>
    <p>You are logged in successfully</p>

    <a href="LogoutServlet">Logout</a>
</div>

</body>
</html>