package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.Rate;
import com.workSpaceFinder.server.repositories.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RateService {

    private final RateRepository rateRepository;

    @Autowired
    public RateService(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    public Map<String, Object> createRate(Rate rate) {
        Map<String, Object> response = new HashMap<>();
        rate.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));

        // Set the rating_value
        rate.setRating_value(rate.getRating()); // Ensuring it's an integer

        // Check if the rating already exists
        Optional<Rate> existingRate = rateRepository.findRatingByUserAndWorkSpace(rate.getUser_id(), rate.getWorkSpace_id());
        if (existingRate.isPresent()) {
            response.put("message", "Rating already exists for this workspace by this user.");
            return response;
        }

        Rate savedRate = rateRepository.save(rate);
        response.put("message", "Rating created successfully.");
        response.put("rate", savedRate);
        return response;
}


    public Map<String, Object> getAllRates() {
        Map<String, Object> response = new HashMap<>();
        List<Rate> rates = rateRepository.findAll();

        if (rates.isEmpty()) {
            response.put("message", "No ratings found.");
        } else {
            response.put("ratings", rates);
        }
        return response;
    }

    public Map<String, Object> getRateById(Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Rate> rates = rateRepository.findByWorkSpaceId(id);

        if (!rates.isEmpty()) {
            response.put("ratings", rates);
        } else {
            response.put("message", "Rating not found.");
        }

        return response;
    }

    public Map<String, Object> updateRate(Long id, Rate updatedRate) {
        Map<String, Object> response = new HashMap<>();
        Optional<Rate> existingRate = rateRepository.findById(id);

        if (existingRate.isPresent()) {
         Rate rate = existingRate.get();
         rate.setRating(updatedRate.getRating());
        rate.setComment(updatedRate.getComment());
        rate.setNoise_level(updatedRate.getNoise_level());
        rate.setRating_value(updatedRate.getRating()); // Update rating_value based on the new rating
        Rate savedRate = rateRepository.save(rate);
        response.put("message", "Rating updated successfully.");
        response.put("rate", savedRate);
    } else {
        response.put("message", "Rating not found.");
    }

    return response;
}


    public Map<String, Object> deleteRate(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Rate> rate = rateRepository.findById(id);
        if (rate.isPresent()) {
            rateRepository.deleteById(id);
            response.put("message", "Rating deleted successfully.");
        } else {
            response.put("message", "Rating not found.");
        }
        return response;
    }

    // ✅ Newly Added Service Methods

    public Rate saveRate(Rate rate) {
        return rateRepository.save(rate);
    }

    public List<Rate> getRatingsByWorkSpaceId(Long workSpaceId) {
        return rateRepository.findByWorkSpaceId(workSpaceId);
    }
}
