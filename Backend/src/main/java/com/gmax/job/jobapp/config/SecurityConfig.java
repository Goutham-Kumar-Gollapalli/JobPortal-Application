package com.gmax.job.jobapp.config;


//import com.example.jobportal.security.JwtAuthenticationFilter;

import com.gmax.job.jobapp.security.JwtAuthenticationFilter;
import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())

                // REST API using JWT authentication
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//
//                        // Anyone can view jobs
//                        .requestMatchers(HttpMethod.GET, "/job/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/views/jobpost/**").permitAll()
//
//                        // Only employers can modify jobs
//                        .requestMatchers(HttpMethod.POST, "/job/**").hasRole("EMPLOYER")
//                        .requestMatchers(HttpMethod.PUT, "/job/**").hasRole("EMPLOYER")
//                        .requestMatchers(HttpMethod.PATCH, "/job/**").hasRole("EMPLOYER")
//                        .requestMatchers(HttpMethod.DELETE, "/job/**").hasRole("EMPLOYER")
//
//                        .anyRequest().authenticated()
//                );
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()

                // Allow everyone to view jobs
                .requestMatchers(HttpMethod.GET, "/views/jobposts/**").permitAll()

                // Allow OPTIONS requests for CORS
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .anyRequest().authenticated()
        );
//                .authorizeHttpRequests(auth -> auth
//                        // Signup and login
//                        .requestMatchers("/api/auth/**").permitAll()
//
//                        // CORS preflight requests
//                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//
//                        // Anyone can view job posts
//                        .requestMatchers(HttpMethod.GET, "/job/**").permitAll()
//
//                        // Only employers can create job posts
//                        .requestMatchers(HttpMethod.POST, "/job/**")
//                        .hasRole("EMPLOYER")
//
//                        // Only employers can update job posts
//                        .requestMatchers(HttpMethod.PUT, "/job/**")
//                        .hasRole("EMPLOYER")
//
//                        .requestMatchers(HttpMethod.PATCH, "/job/**")
//                        .hasRole("EMPLOYER")
//
//                        // Only employers can delete job posts
//                        .requestMatchers(HttpMethod.DELETE, "/job/**")
//                        .hasRole("EMPLOYER")
//
//                        // All other endpoints require authentication
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(
//                        (Filter) jwtAuthenticationFilter,
//                        UsernamePasswordAuthenticationFilter.class
//                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                frontendUrl
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**", configuration
        );

        return source;
    }
}
