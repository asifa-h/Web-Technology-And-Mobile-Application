package com.demo;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/GetPostServlet")
public class GetPostServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        showResult(request, response, "GET");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        showResult(request, response, "POST");
    }

    private void showResult(HttpServletRequest request, HttpServletResponse response, String method)
            throws IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String email = request.getParameter("email");

        out.println("<html>");
        out.println("<head>");
        out.println("<title>Form Result</title>");

        out.println("<style>");
        out.println("body{font-family:Arial;background:linear-gradient(to right,#74ebd5,#ACB6E5);display:flex;justify-content:center;align-items:center;height:100vh;}");
        out.println(".card{background:white;padding:30px;border-radius:10px;box-shadow:0 4px 15px rgba(0,0,0,0.2);width:350px;text-align:center;}");
        out.println("h2{color:#333;}");
        out.println("p{font-size:16px;margin:10px 0;}");
        out.println(".btn{display:inline-block;margin-top:15px;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;}");
        out.println(".btn:hover{background:#45a049;}");
        out.println("</style>");

        out.println("</head>");
        out.println("<body>");

        out.println("<div class='card'>");
        out.println("<h2>" + method + " Method Result</h2>");
        out.println("<p><b>Name:</b> " + name + "</p>");
        out.println("<p><b>Email:</b> " + email + "</p>");
        out.println("<a class='btn' href='form.html'>Go Back</a>");
        out.println("</div>");

        out.println("</body>");
        out.println("</html>");
    }
}