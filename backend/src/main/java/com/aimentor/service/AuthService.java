package com.aimentor.service;

import com.aimentor.model.User;
import com.aimentor.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> authenticate(String email, String rawPassword) {
        Optional<User> u = userRepository.findByEmail(email);
        if (u.isPresent() && passwordEncoder.matches(rawPassword, u.get().getPassword())) return u;
        return Optional.empty();
    }

    public Optional<User> updateRole(String email, String role) {
        Optional<User> u = userRepository.findByEmail(email);
        u.ifPresent(user -> { user.setRole(role); userRepository.save(user); });
        return u;
    }
}
