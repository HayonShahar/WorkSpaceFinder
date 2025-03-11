package com.workSpaceFinder.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // שימוש בהגדרה מותאמת ל-CORS
                .httpBasic(httpBasic -> httpBasic.disable()) // רק אם לא משתמשים ב-HTTP Basic
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register", "/api/users/register/email", "/api/users/login", "/api/workSpace", "/api/favorites", "/api/ratings/**", "/api/ratings", "/api/promotes").permitAll()
                        .anyRequest().authenticated() // כל בקשה אחרת דורשת אימות
                );
        return http.build();
    }

    // הגדרה מותאמת ל-CORS
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173"); // הוספת מקור שמורשה (הפרונטאנד שלך)
        config.addAllowedMethod("*"); // הרשה את כל השיטות (GET, POST, DELETE וכו')
        config.addAllowedHeader("*"); // הרשה את כל הכותרות
        source.registerCorsConfiguration("/**", config); // החלת ההגדרה על כל הקווים
        return source;
    }
}
