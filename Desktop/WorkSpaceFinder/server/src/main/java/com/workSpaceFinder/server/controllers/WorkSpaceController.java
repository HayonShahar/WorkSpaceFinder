package com.workSpaceFinder.server.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.services.WorkSpaceService;

@RestController
@RequestMapping("/api/workSpace")
public class WorkSpaceController {

    @Autowired
    private WorkSpaceService workSpaceService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createWorkSpace(@RequestBody WorkSpace workSpace) {
        Map<String, Object> response = workSpaceService.createWorkSpace(workSpace);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllWorkSpaces() {
        Map<String, Object> response = workSpaceService.getAllWorkSpaces();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getWorkSpaceById(@PathVariable Long id) {
        Map<String, Object> response = workSpaceService.getWorkSpaceById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateWorkSpace(@PathVariable Long id, @RequestBody WorkSpace workSpace) {
        Map<String, Object> response = workSpaceService.updateWorkSpace(id, workSpace);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteWorkSpace(@PathVariable Long id) {
        Map<String, Object> response = workSpaceService.deleteWorkSpace(id);
        return ResponseEntity.ok(response);
    }
}
