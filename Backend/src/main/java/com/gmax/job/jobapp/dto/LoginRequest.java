package com.gmax.job.jobapp.dto;

public record LoginRequest(
        String email,
        String password
) {
}