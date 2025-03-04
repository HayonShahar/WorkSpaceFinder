package com.workSpaceFinder.server.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "ratings")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    Long user_id;
    Long workSpace_id;
    Long rating;
    String comment;
    Long noise_level;
    Date created_at;
}
