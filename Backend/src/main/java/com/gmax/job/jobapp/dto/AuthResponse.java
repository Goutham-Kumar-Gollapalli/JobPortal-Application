package com.gmax.job.jobapp.dto;

public record AuthResponse(
        String token,
        String name,
        String email,
        String role
) {
}