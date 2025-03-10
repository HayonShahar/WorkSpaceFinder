//package com.workSpaceFinder.server.filters;
//
//import com.workSpaceFinder.server.utils.JwtUtil;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.UnsupportedJwtException;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Map;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.workSpaceFinder.server.utils.JwtUtil;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.UnsupportedJwtException;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Map;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
//
//    @Override
//    protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
//            throws jakarta.servlet.ServletException, IOException {
//
//        // לוג עבור התחלת הבדיקה
//        logger.info("Starting authentication check");
//
//        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//        // לוג להדפסת ה-header שמגיע
//        logger.info("Authorization Header: " + authHeader);
//
//        // אם לא נמצא ה-header או אם הוא לא מתחיל ב-"Bearer "
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            logger.warn("No Authorization header found or header doesn't start with 'Bearer'");
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//        try {
//            // לוג שמתחיל את תהליך פענוח הטוקן
//            logger.info("Attempting to parse JWT token");
//
//            Map<String, String> userInfo = JwtUtil.extractUserInfo(token);
//            String email = userInfo.get("email");
//
//            // לוג לאחר חילוץ המידע מהטוקן
//            logger.info("User info extracted from token: " + email);
//
//            UserDetails userDetails = User.withUsername(email).password("").authorities("USER").build();
//            UsernamePasswordAuthenticationToken authentication =
//                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
//            // לוג שגיאה במקרה של טוקן לא תקין
//            logger.error("Invalid or expired token", e);
//            response.setStatus(HttpStatus.UNAUTHORIZED.value());
//            response.getWriter().write("Invalid or expired token");
//            return;
//        }
//
//        // לוג לאחר סיום הבדיקה והעברת הבקשה הלאה
//        logger.info("Authentication successful, passing request to the next filter");
//        filterChain.doFilter(request, response);
//    }
//}
//
//
//
