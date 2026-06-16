package com.aimentor.controller;

import com.aimentor.dto.ApiResponse;
import com.aimentor.model.User;
import com.aimentor.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody Map<String, String> payload) {
        String name = payload.get("fullName");
        String email = payload.get("email");
        String password = payload.get("password");
        String interests = payload.getOrDefault("interests", "");
        if (name == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing required fields"));
        }
        User u = new User();
        u.setFullName(name);
        u.setEmail(email.toLowerCase());
        u.setPassword(password);
        u.setInterests(interests);
        try {
            authService.register(u);
            return ResponseEntity.ok(new ApiResponse(true, "Registered"));
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            // likely unique constraint on email
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email already registered"));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "Registration failed: " + ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing fields"));
        return authService.authenticate(email.toLowerCase(), password)
                .map(user -> ResponseEntity.ok(new ApiResponse(true, "Authenticated")))
                .orElseGet(() -> ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials")));
    }

    @PostMapping("/role")
    public ResponseEntity<ApiResponse> setRole(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String role = payload.get("role");
        if (email == null || role == null) return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing fields"));
        return authService.updateRole(email.toLowerCase(), role)
                .map(u -> ResponseEntity.ok(new ApiResponse(true, "Role updated")))
                .orElseGet(() -> ResponseEntity.badRequest().body(new ApiResponse(false, "User not found")));
    }
}
