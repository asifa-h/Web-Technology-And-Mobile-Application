import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if(username.equals("admin") && password.equals("1234")){

            HttpSession session = request.getSession();
            session.setAttribute("user", username);

            response.sendRedirect("home.jsp");

        } else {
            response.sendRedirect("invalidlogin.jsp");
        }
    }
}