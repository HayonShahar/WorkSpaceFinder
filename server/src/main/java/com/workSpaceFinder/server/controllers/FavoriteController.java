package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.Favorite;
import com.workSpaceFinder.server.services.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createFavorite(@RequestBody Favorite favorite) {
        Map<String, Object> response = favoriteService.createFavorite(favorite);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllFavorites() {
        Map<String, Object> response = favoriteService.getAllFavorites();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getFavoriteById(@PathVariable Long id) {
        Map<String, Object> response = favoriteService.getFavoriteById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateFavorite(@PathVariable Long id, @RequestBody Favorite updatedFavorite) {
        Map<String, Object> response = favoriteService.updateFavorite(id, updatedFavorite);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteFavorite(@PathVariable Long id) {
        Map<String, Object> response = favoriteService.deleteFavorite(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
