package com.workSpaceFinder.server.dto;

import java.util.Date;

import com.workSpaceFinder.server.models.User;

public class RateDTO {
    Long id;
    Long workSpace_id;
    Long rating;
    String comment;
    Long noise_level;
    Date created_at;
    UserDTO userDTO;

    public RateDTO(Long id, Long workSpace_id, Long rating, String comment, Long noise_level, Date created_at, UserDTO userDTO) {
        this.id = id;
        this.workSpace_id = workSpace_id;
        this.rating = rating;
        this.comment = comment;
        this.noise_level = noise_level;
        this.created_at = created_at;
        this.userDTO = userDTO;
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

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public String toString() {
        return "RateDTO{" +
                "id=" + id +
                ", workSpace_id=" + workSpace_id +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", noise_level=" + noise_level +
                ", created_at=" + created_at +
                ", userDTO=" + userDTO +
                '}';
    }
}
