package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.Rate;
import com.workSpaceFinder.server.services.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    return response.containsKey("rate") ? ResponseEntity.status(HttpStatus.CREATED).body(response)
                                         : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
}

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRatings() {
        Map<String, Object> response = rateService.getAllRates();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRatingById(@PathVariable Long id) {
        Map<String, Object> response = rateService.getRateById(id);
        return response.containsKey("rate")
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

 @PutMapping("/{id}")
public ResponseEntity<Map<String, Object>> updateRating(@PathVariable Long id, @RequestBody Rate updatedRate) {
    Map<String, Object> response = rateService.updateRate(id, updatedRate);
    return response.containsKey("rate") ? ResponseEntity.ok(response)
                                         : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}

  @DeleteMapping("/{id}")
public ResponseEntity<Map<String, Object>> deleteRating(@PathVariable Long id) {
    Map<String, Object> response = rateService.deleteRate(id);
    return response.containsKey("message") ? ResponseEntity.ok(response)
                                           : ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}
}
