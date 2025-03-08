package com.workSpaceFinder.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.workSpaceFinder.server.models.Rate;

public interface RateRepository extends JpaRepository<Rate, Long> {
    
    @Query(value = "SELECT * FROM ratings WHERE user_id = :user_id AND work_space_id = :workSpace_id", nativeQuery = true)
    Optional<Rate> findRatingByUserAndWorkSpace(@Param("user_id") Long userId, @Param("workSpace_id") Long workSpaceId);

    @Query(value = "SELECT * FROM ratings WHERE work_space_id = :workSpace_id", nativeQuery = true)
    List<Rate> findByWorkSpaceId(@Param("workSpace_id") Long workSpaceId);

    // Newly Added Method to fetch comments by workspaceId
    @Query(value = "SELECT comment FROM ratings WHERE work_space_id = :workSpace_id", nativeQuery = true)
    List<String> findCommentsByWorkSpaceId(@Param("workSpace_id") Long workSpaceId);

    @Query(value = "SELECT AVG(rating) FROM ratings WHERE work_space_id = :workSpace_id", nativeQuery = true)
    Double findAverageRatingByWorkSpaceId(@Param("workSpace_id") Long workSpaceId);

}
