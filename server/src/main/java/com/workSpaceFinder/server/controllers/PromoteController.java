package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.Promote;
import com.workSpaceFinder.server.services.PromoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/promotes")
public class PromoteController {

    private final PromoteService promoteService;

    @Autowired
    public PromoteController(PromoteService promoteService) {
        this.promoteService = promoteService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPromote(@RequestBody Promote promote) {
        Map<String, Object> response = promoteService.savePromote(promote);
            return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPromotes() {
        Map<String, Object> response = promoteService.getAllPromotes();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{workSpaceId}")
    public ResponseEntity<Map<String, Object>> getPromotesByWorkSpaceId(@PathVariable Long workSpaceId) {
        Map<String, Object> response = promoteService.getPromotesByWorkSpaceId(workSpaceId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePromote(@PathVariable Long id) {
        Map<String, Object> response = promoteService.deletePromote(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
