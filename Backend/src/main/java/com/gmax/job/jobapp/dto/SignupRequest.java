package com.gmax.job.jobapp.dto;

import com.gmax.job.jobapp.model.Role;

public record SignupRequest(
        String name,
        String email,
        String password,
        Role role
) {
}