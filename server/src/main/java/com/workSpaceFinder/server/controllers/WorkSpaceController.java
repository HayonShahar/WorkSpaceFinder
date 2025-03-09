package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.services.WorkSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllWorkSpaces() {
        Map<String, Object> response = workSpaceService.getAllWorkSpaces();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getWorkSpaceById(@PathVariable Long id) {
        Map<String, Object> response = workSpaceService.getWorkSpaceById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateWorkSpace(@PathVariable Long id, @RequestBody WorkSpace workSpace) {
        Map<String, Object> response = workSpaceService.updateWorkSpace(id, workSpace);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteWorkSpace(@PathVariable Long id) {
        Map<String, Object> response = workSpaceService.deleteWorkSpace(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
