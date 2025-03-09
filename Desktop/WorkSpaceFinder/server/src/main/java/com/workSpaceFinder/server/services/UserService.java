package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.dto.UserDTO;
import com.workSpaceFinder.server.models.User;
import com.workSpaceFinder.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("message", "Email already exists.");
            return response;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        response.put("message", "User registered successfully.");
        response.put("user", UserDTO.fromEntity(savedUser));
        return response;
    }

    public Map<String, Object> loginUser(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            response.put("message", "Login successful.");
            response.put("user", UserDTO.fromEntity(userOptional.get()));
        } else {
            response.put("message", "Invalid email or password.");
        }

        return response;
    }

    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            response.put("message", "No users found.");
        } else {
            List<UserDTO> userDTOs = new ArrayList<>();
            for (User user : users) {
                userDTOs.add(UserDTO.fromEntity(user));
            }
            response.put("users", userDTOs);
        }
        return response;
    }

    public Map<String, Object> getUserById(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            response.put("user", UserDTO.fromEntity(userOptional.get()));
        } else {
            response.put("message", "User not found.");
        }
        return response;
    }

    public Map<String, Object> updateUser(Long id, User updatedUser) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirst_name(updatedUser.getFirst_name());
            user.setLast_name(updatedUser.getLast_name());
            user.setEmail(updatedUser.getEmail());
            user.setDob(updatedUser.getDob());
            userRepository.save(user);
            response.put("user", UserDTO.fromEntity(user));
        } else {
            response.put("message", "User not found.");
        }
        return response;
    }

    public Map<String, Object> deleteUser(Long id) {
        Map<String, Object> response = new HashMap<>();
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            response.put("message", "User deleted successfully.");
        } else {
            response.put("message", "User not found.");
        }
        return response;
    }
}
