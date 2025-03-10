package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.Promote;
import com.workSpaceFinder.server.repositories.PromoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PromoteService {

    private final PromoteRepository promoteRepository;

    @Autowired
    public PromoteService(PromoteRepository promoteRepository) {
        this.promoteRepository = promoteRepository;
    }

    public Map<String, Object> savePromote(Promote promote) {
        Map<String, Object> response = new HashMap<>();

        Optional<Promote> promoteOptional = promoteRepository.findPromotionsByWorkSpaceId(promote.getWorkSpaceId());

        if(promoteOptional.isPresent()){
            System.out.println("ssssss:   "+promoteOptional.get());
            response.put("success", false);
            response.put("message", "This workSpace already have promote!");
            return response;
        }

        Promote promoteToSave = new Promote(promote.getWorkSpaceId(), promote.getUserId(), promote.getPromoteRoll());
        Promote savedPromote = promoteRepository.save(promoteToSave);

        response.put("success", true);
        response.put("message", "Promote saved successfully.");
        response.put("promote", savedPromote);

        return response;
    }

    public Map<String, Object> getAllPromotes() {
        Map<String, Object> response = new HashMap<>();
        List<Promote> promotes = promoteRepository.findAll();

        if (promotes.isEmpty()) {
            response.put("success", false);
            response.put("message", "No promotes found.");
        } else {
            response.put("success", true);
            response.put("promotes", promotes);
        }

        return response;
    }

    public Map<String, Object> getPromotesByWorkSpaceId(Long workSpaceId) {
        Map<String, Object> response = new HashMap<>();
        Optional<Promote> promoteOptional = promoteRepository.findPromotionsByWorkSpaceId(workSpaceId);

        if (promoteOptional.isPresent()) {
            response.put("success", true);
            response.put("promotes", promoteOptional.get());
        } else {
            response.put("success", false);
            response.put("message", "No promotes found for workspace with id: " + workSpaceId);
        }

        return response;
    }

    public Map<String, Object> deletePromote(Long id) {
        Map<String, Object> response = new HashMap<>();
        if (promoteRepository.existsById(id)) {
            promoteRepository.deleteById(id);
            response.put("success", true);
            response.put("message", "Promote deleted successfully.");
        } else {
            response.put("success", false);
            response.put("message", "Promote not found with id: " + id);
        }

        return response;
    }
}
