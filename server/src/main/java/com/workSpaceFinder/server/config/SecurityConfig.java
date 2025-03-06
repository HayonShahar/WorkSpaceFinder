package com.workSpaceFinder.server.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);  // יצירת לוגר

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring security settings...");  // לוג כשהתצורה מתחילה

        http
                .csrf(csrf -> {
                    csrf.disable();
                    logger.info("CSRF protection disabled.");  // לוג לאחר השבתת CSRF
                })
                .cors(cors -> {
                    cors.disable();
                    logger.info("CORS protection disabled.");  // לוג לאחר השבתת CORS
                })
                .authorizeHttpRequests(
                        auth -> auth
                                .anyRequest().permitAll()  // כל הבקשות פתוחות
                )
                .httpBasic(Customizer.withDefaults());

        logger.info("Security configuration completed.");  // לוג כאשר כל התצורה הושלמה

        return http.build();
    }
}


//.authorizeHttpRequests(
//  auth -> auth
//      .requestMatchers("/api/users", "/api/users/register", "/api/users/login", "/api/workSpace/")  // מאפשר גישה פתוחה ל-API
//      .permitAll()  // פתוח לכולם
//      .anyRequest().authenticated()  // כל בקשה אחרת דורשת התחברות
//)