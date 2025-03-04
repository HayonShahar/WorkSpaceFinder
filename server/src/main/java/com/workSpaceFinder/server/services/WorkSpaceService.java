package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.User;
import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.repositories.UserRepository;
import com.workSpaceFinder.server.repositories.WorkSpaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkSpaceService {

    private final WorkSpaceRepository workSpaceRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public WorkSpaceService(WorkSpaceRepository workSpaceRepository) {
        this.workSpaceRepository = workSpaceRepository;
    }


    public Map<String, Object> saveNewSpace(WorkSpace workSpace) {
        Map<String, Object> response = new HashMap<>();
        try {
            WorkSpace space = workSpaceRepository.save(workSpace);
            response.put("message", "Workspace saved successfully.");
            response.put("workSpaces", space);
        } catch (Exception e) {
            response.put("message", "Error occurred while saving workspace: " + e.getMessage());
            response.put("workSpace", null);
            throw new RuntimeException("Error occurred while saving workspace: " + e.getMessage(), e);
        }
        return response;
    }

}
