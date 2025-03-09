package com.workSpaceFinder.server.repositories;

import com.workSpaceFinder.server.models.Favorite;
import com.workSpaceFinder.server.models.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
