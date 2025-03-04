package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.User;
import com.workSpaceFinder.server.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                response.put("message", "No users found");
                response.put("users", null);
            } else {
                response.put("message", "Users retrieved successfully.");
                response.put("users", users);
            }
        } catch (Exception e) {
            response.put("message", "Error occurred while fetching users: " + e.getMessage());
            response.put("users", null);
            throw new RuntimeException("Error occurred while fetching users: " + e.getMessage(), e);
        }
        return response;
    }

}
