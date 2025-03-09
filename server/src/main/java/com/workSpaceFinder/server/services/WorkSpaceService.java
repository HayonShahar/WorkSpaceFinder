package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.repositories.WorkSpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WorkSpaceService {

    @Autowired
    private WorkSpaceRepository workSpaceRepository;

    public Map<String, Object> createWorkSpace(WorkSpace workSpace) {
        Map<String, Object> response = new HashMap<>();
        try {
            WorkSpace savedWorkSpace = workSpaceRepository.save(workSpace);
            response.put("message", "WorkSpace created successfully.");
            response.put("workSpace", savedWorkSpace);
            response.put("success", true);
        } catch (Exception e) {
            response.put("message", "Error creating WorkSpace: " + e.getMessage());
            response.put("success", false);
        }
        return response;
    }

    public Map<String, Object> getAllWorkSpaces() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<WorkSpace> workSpaces = workSpaceRepository.findAll();
            response.put("message", "WorkSpaces retrieved successfully.");
            response.put("workSpaces", workSpaces);
            response.put("success", true);
        } catch (Exception e) {
            response.put("message", "Error retrieving WorkSpaces: " + e.getMessage());
            response.put("success", false);
        }
        return response;
    }

    public Map<String, Object> getWorkSpaceById(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<WorkSpace> workSpace = workSpaceRepository.findById(id);
            if (workSpace.isPresent()) {
                response.put("message", "WorkSpace found.");
                response.put("success", true);
                response.put("workSpace", workSpace.get());
            } else {
                response.put("message", "WorkSpace not found.");
                response.put("success", false);
            }
        } catch (Exception e) {
            response.put("message", "Error retrieving WorkSpace: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> updateWorkSpace(Long id, WorkSpace workSpaceDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<WorkSpace> workSpaceOptional = workSpaceRepository.findById(id);
            if (workSpaceOptional.isPresent()) {
                WorkSpace workSpace = workSpaceOptional.get();
                workSpace.setName(workSpaceDetails.getName());
                workSpace.setAddress(workSpaceDetails.getAddress());
                workSpace.setType(workSpaceDetails.getType());
                workSpace.setRating(workSpaceDetails.getRating());
                workSpace.setNoise_level(workSpaceDetails.getNoise_level());
                workSpace.setDescription(workSpaceDetails.getDescription());
                workSpace.setImage_url(workSpaceDetails.getImage_url());

                WorkSpace updatedWorkSpace = workSpaceRepository.save(workSpace);
                response.put("message", "WorkSpace updated successfully.");
                response.put("workSpace", updatedWorkSpace);
                response.put("success", true);
            } else {
                response.put("message", "WorkSpace not found.");
                response.put("success", false);
            }
        } catch (Exception e) {
            response.put("message", "Error updating WorkSpace: " + e.getMessage());
            response.put("success", false);
        }
        return response;
    }

    public Map<String, Object> deleteWorkSpace(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<WorkSpace> workSpaceOptional = workSpaceRepository.findById(id);
            if (workSpaceOptional.isPresent()) {
                workSpaceRepository.deleteById(id);
                response.put("message", "WorkSpace deleted successfully.");
                response.put("success", true);
            } else {
                response.put("message", "WorkSpace not found.");
                response.put("success", false);
            }
        } catch (Exception e) {
            response.put("message", "Error deleting WorkSpace: Please try again later");
            response.put("success", false);
        }
        return response;
    }
}
