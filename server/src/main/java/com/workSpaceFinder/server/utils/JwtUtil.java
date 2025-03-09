package com.workSpaceFinder.server.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public static String generateToken(String email, String userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId) // "userId" key used for user ID
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public static Map<String, String> extractUserInfo(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();  // Get email from subject
        String userId = claims.get("userId", String.class);  // Use "userId" key to extract the user ID

        System.out.println("Email: " + email);
        System.out.println("User ID: " + userId);

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("id", userId);
        userInfo.put("email", email);

        return userInfo;
    }
}
