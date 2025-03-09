package com.workSpaceFinder.server.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
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
                '}';
    }
}