package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.services.WorkSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
