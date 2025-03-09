package com.workSpaceFinder.server.services;

import com.workSpaceFinder.server.models.Favorite;
import com.workSpaceFinder.server.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public Map<String, Object> createFavorite(Favorite favorite) {
        Map<String, Object> response = new HashMap<>();
        Favorite savedFavorite = favoriteRepository.save(favorite);
        response.put("message", "Favorite created successfully.");
        response.put("favorite", savedFavorite);
        return response;
    }

    public Map<String, Object> getAllFavorites() {
        Map<String, Object> response = new HashMap<>();
        List<Favorite> favorites = favoriteRepository.findAll();
        if (favorites.isEmpty()) {
            response.put("message", "No favorites found.");
        } else {
            response.put("favorites", favorites);
        }
        return response;
    }

    public Map<String, Object> getFavoriteById(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Favorite> favoriteOptional = favoriteRepository.findById(id);
        if (favoriteOptional.isPresent()) {
            response.put("favorite", favoriteOptional.get());
        } else {
            response.put("message", "Favorite not found.");
        }
        return response;
    }

    public Map<String, Object> updateFavorite(Long id, Favorite updatedFavorite) {
        Map<String, Object> response = new HashMap<>();
        Optional<Favorite> favoriteOptional = favoriteRepository.findById(id);
        if (favoriteOptional.isPresent()) {
            Favorite favorite = favoriteOptional.get();
            favorite.setUser_id(updatedFavorite.getUser_id());
            favorite.setWorkSpace_id(updatedFavorite.getWorkSpace_id());
            favoriteRepository.save(favorite);
            response.put("message", "Favorite updated successfully.");
            response.put("favorite", favorite);
        } else {
            response.put("message", "Favorite not found.");
        }
        return response;
    }

    public Map<String, Object> deleteFavorite(Long id) {
        Map<String, Object> response = new HashMap<>();
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            response.put("message", "Favorite deleted successfully.");
        } else {
            response.put("message", "Favorite not found.");
        }
        return response;
    }
}
