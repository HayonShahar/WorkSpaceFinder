package com.workSpaceFinder.server.utils;

import io.jsonwebtoken.*;
import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    public static String generate256BitString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(input.getBytes());

            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    private static final String key = generate256BitString("WorkSpaceFinder");
    private static final long EXPIRATION_TIME = 864_000_000; // 10 ימים

    public static String generateToken(String email, String userId) {
        // המרת המפתח מ-String ל-SecretKey
        SecretKey secretKey = Keys.hmacShaKeyFor(key.getBytes());

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId) // הוספת מזהה המשתמש
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS256) // חתימה עם אלגוריתם HS256
                .compact();
    }

    public static Map<String, String> extractUserInfo(String token) {
        // המרת המפתח מ-String ל-SecretKey
        SecretKey secretKey = Keys.hmacShaKeyFor(key.getBytes());

        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();  // קבלת האימייל מה-subject
        String userId = claims.get("userId", String.class);  // קבלת מזהה המשתמש

        System.out.println("Email: " + email);
        System.out.println("User ID: " + userId);

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("id", userId);
        userInfo.put("email", email);

        return userInfo;
    }
}
