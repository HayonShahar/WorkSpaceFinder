package com.workSpaceFinder.server.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workSpaceFinder.server.models.Rate;
import com.workSpaceFinder.server.services.RateService;

@RestController
@RequestMapping("/api/ratings")
public class RateController {

    private final RateService rateService;

    @Autowired
    public RateController(RateService rateService) {
        this.rateService = rateService;
    }

    // Create a new rating
    @PostMapping
    public ResponseEntity<Map<String, Object>> createRating(@RequestBody Rate rate) {
        Map<String, Object> response = rateService.createRate(rate);
        return response.containsKey("rate") 
                ? ResponseEntity.status(HttpStatus.CREATED).body(response)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Get all ratings
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRatings() {
        Map<String, Object> response = rateService.getAllRates();
        return ResponseEntity.ok(response);
    }

    // Get rating by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRatingById(@PathVariable Long id) {
        Map<String, Object> response = rateService.getRateById(id);
        return response.containsKey("rate") 
                ? ResponseEntity.ok(response) 
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Update rating by ID
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateRating(@PathVariable Long id, @RequestBody Rate updatedRate) {
        Map<String, Object> response = rateService.updateRate(id, updatedRate);
        return response.containsKey("rate") 
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Delete rating by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRating(@PathVariable Long id) {
        Map<String, Object> response = rateService.deleteRate(id);
        return response.containsKey("message") 
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Fetch comments by workSpaceId (assuming comments are part of the Rate model)
    @GetMapping("/workspace/{workSpaceId}/comments")
    public ResponseEntity<Map<String, Object>> getCommentsByWorkSpaceId(@PathVariable Long workSpaceId) {
        Map<String, Object> response = rateService.getCommentsByWorkSpaceId(workSpaceId);
        return response.containsKey("comments")
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @GetMapping("/workspace/{workSpaceId}/ratings")
public ResponseEntity<Map<String, Object>> getRatingsWithAverage(@PathVariable Long workSpaceId) {
    Map<String, Object> response = rateService.getRatingsWithAverage(workSpaceId);
    return response.containsKey("ratings") 
            ? ResponseEntity.ok(response)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}



}
