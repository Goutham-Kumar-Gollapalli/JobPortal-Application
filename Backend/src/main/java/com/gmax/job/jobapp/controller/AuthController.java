package com.gmax.job.jobapp.controller;

import com.gmax.job.jobapp.dto.AuthResponse;
import com.gmax.job.jobapp.dto.LoginRequest;
import com.gmax.job.jobapp.dto.SignupRequest;
import com.gmax.job.jobapp.model.Role;
import com.gmax.job.jobapp.model.User;
import com.gmax.job.jobapp.repository.UserRepository;
import com.gmax.job.jobapp.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignupRequest request) {

        // Validate input
        if (request.name() == null || request.name().isBlank()
                || request.email() == null || request.email().isBlank()
                || request.password() == null
                || request.password().length() < 8) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "Name and email are required. Password must contain at least 8 characters."
                    )
            );
        }

        // Normalize email
        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        // Check whether email already exists
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("message", "Email is already registered.")
            );
        }

        // Assign role selected on the signup form
        Role role = request.role();

        if (role == null) {
            role = Role.JOB_SEEKER;
        }

        // Allow only supported roles
        if (role != Role.JOB_SEEKER && role != Role.EMPLOYER) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Invalid role selected.")
            );
        }

        // Create user
        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(
                passwordEncoder.encode(request.password())
        );
        user.setRole(role);

        // Save user
        userRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(user);

        // Return saved role to frontend
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AuthResponse(
                        token,
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name()
                )
        );
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        if (request.email() == null
                || request.password() == null) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "Email and password are required."
                    )
            );
        }

        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null
                || !passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid email or password."
                            )
                    );
        }

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name()
                )
        );
    }
}
