package com.workSpaceFinder.server.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ratings")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "work_space_id")
    private Long workSpace_id;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "noise_level")
    private Long noise_level;

    @Column(name = "created_at")
    private Date created_at;

    // Add 'rating_value' field
    @Column(name = "rating_value")
    private Integer rating_value;

    // Getters and Setters
    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getWorkSpace_id() {
        return workSpace_id;
    }

    public void setWorkSpace_id(Long workSpace_id) {
        this.workSpace_id = workSpace_id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getNoise_level() {
        return noise_level;
    }

    public void setNoise_level(Long noise_level) {
        this.noise_level = noise_level;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Long getId() {
        return id;
    }

    public Integer getRating_value() {
        return rating_value;
    }

    public void setRating_value(Integer rating_value) {
        this.rating_value = rating_value;
    }

    @Override
    public String toString() {
        return "Rate{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", workSpace_id=" + workSpace_id +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", noise_level=" + noise_level +
                ", created_at=" + created_at +
                ", rating_value=" + rating_value +
                '}';
    }
}
