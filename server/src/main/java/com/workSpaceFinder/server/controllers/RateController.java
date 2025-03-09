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

    @PostMapping
    public ResponseEntity<Map<String, Object>> createRating(@RequestBody Rate rate) {
        Map<String, Object> response = rateService.createRate(rate);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRatings() {
        Map<String, Object> response = rateService.getAllRates();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRatingById(@PathVariable Long id) {
        Map<String, Object> response = rateService.getRateById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateRating(@PathVariable Long id, @RequestBody Rate updatedRate) {
        Map<String, Object> response = rateService.updateRate(id, updatedRate);
        return response.containsKey("rate")
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRating(@PathVariable Long id) {
        Map<String, Object> response = rateService.deleteRate(id);
        return response.containsKey("message")
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}