package com.workSpaceFinder.server.services;

import java.time.LocalDateTime;
import java.util.*;

import com.workSpaceFinder.server.dto.RateDTO;
import com.workSpaceFinder.server.dto.UserDTO;
import com.workSpaceFinder.server.models.User;
import com.workSpaceFinder.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workSpaceFinder.server.models.Rate;
import com.workSpaceFinder.server.repositories.RateRepository;
import com.workSpaceFinder.server.repositories.UserRepository;

import static com.workSpaceFinder.server.dto.UserDTO.fromEntity;

@Service
public class RateService {

    private final RateRepository rateRepository;
    private final UserRepository userRepository;

    @Autowired
    public RateService(RateRepository rateRepository, UserRepository userRepository) {
        this.rateRepository = rateRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> createRate(Rate rate) {
        Map<String, Object> response = new HashMap<>();

        rate.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));

        Optional<Rate> existingRate = rateRepository.findRatingByUserAndWorkSpace(rate.getUser_id(), rate.getWorkSpace_id());
        if (existingRate.isPresent()) {
            System.out.print("1");
            response.put("message", "Rating already exists for this workspace by this user.");
            response.put("success", false);
        } else {
            Rate savedRate = rateRepository.save(rate);
            System.out.print("2");
            response.put("message", "Rating created successfully.");
            response.put("success", true);
            response.put("rate", savedRate);
        }
        return response;
    }

    public Map<String, Object> getAllRates() {
        Map<String, Object> response = new HashMap<>();
        List<Rate> rates = rateRepository.findAll();

        if (rates.isEmpty()) {
            response.put("message", "No ratings found.");
            response.put("success", false);
        } else {
            response.put("ratings", rates);
            response.put("success", true);
        }
        return response;
    }

    public Map<String, Object> getRateById(Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Rate> rates = rateRepository.findByWorkSpaceId(id);
        List<User> users = userRepository.findAll();

        // יצירת רשימה של RateDTO לכל הדירוגים המתאימים
        List<RateDTO> rateDTOs = new ArrayList<>();

        for (Rate rate : rates) {
            // חיפוש המשתמש המתאים לדירוג לפי user_id
            User user = users.stream()
                    .filter(u -> u.getId().equals(rate.getUser_id()))
                    .findFirst()
                    .orElse(null);

            if (user != null) {
                // המרת המשתמש ל-UserDTO
                UserDTO userDTO = fromEntity(user);

                // יצירת RateDTO
                System.out.println(rate.getId());
                RateDTO rateDTO = new RateDTO(rate.getId(), rate.getWorkSpace_id(), rate.getRating(), rate.getComment(),
                        rate.getNoise_level(), rate.getCreated_at(), userDTO);

                // הוספת ה-RateDTO לרשימה
                rateDTOs.add(rateDTO);
            }
        }

        if (rateDTOs.isEmpty()) {
            response.put("message", "No rates found.");
            response.put("success", false);
        } else {
            response.put("ratings", rateDTOs);
            response.put("success", true);
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
            Rate savedRate = rateRepository.save(rate);
            response.put("message", "Rating updated successfully.");
            response.put("rate", savedRate);
            response.put("success", true);
        } else {
            response.put("message", "Rating not found.");
            response.put("success", false);
        }
        return response;
    }

    public Map<String, Object> deleteRate(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Rate> rate = rateRepository.findById(id);
        if (rate.isPresent()) {
            rateRepository.deleteById(id);
            response.put("message", "Rating deleted successfully.");
            response.put("success", true);
        } else {
            response.put("message", "Rating not found.");
            response.put("success", false);
        }
        return response;
    }
}