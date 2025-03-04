package com.workSpaceFinder.server.repositories;

import com.workSpaceFinder.server.models.WorkSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkSpaceRepository extends JpaRepository<WorkSpace, Long> {
}
