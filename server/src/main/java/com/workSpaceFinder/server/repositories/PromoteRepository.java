package com.workSpaceFinder.server.repositories;

import com.workSpaceFinder.server.models.Promote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromoteRepository extends JpaRepository<Promote, Long> {
    @Query("SELECT p FROM Promote p WHERE p.workSpaceId = :workSpaceId")
    Optional<Promote> findPromotionsByWorkSpaceId(@Param("workSpaceId") Long workSpaceId);
}

