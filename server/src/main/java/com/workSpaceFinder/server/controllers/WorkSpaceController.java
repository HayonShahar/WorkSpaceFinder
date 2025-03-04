package com.workSpaceFinder.server.controllers;

import com.workSpaceFinder.server.models.WorkSpace;
import com.workSpaceFinder.server.services.WorkSpaceService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.Map;

@RestController
@RequestMapping("/api/workSpace")
public class WorkSpaceController {

    private final WorkSpaceService workSpaceService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public WorkSpaceController(WorkSpaceService workSpaceService) {
        this.workSpaceService = workSpaceService;
    }

    @PostMapping("/")
    public Map<String, Object> saveNewSpace(@RequestBody WorkSpace workSpaces) {

        logger.error(String.valueOf(workSpaces));
        System.out.println(workSpaces);
        return workSpaceService.saveNewSpace(workSpaces);
    }

}


