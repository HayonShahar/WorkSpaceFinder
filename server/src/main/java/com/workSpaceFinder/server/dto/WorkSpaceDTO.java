package com.workSpaceFinder.server.dto;

import com.workSpaceFinder.server.models.Promote;

public class WorkSpaceDTO {
    private Long id;
    private String name;
    private String address;
    private String type;
    private Long rating;
    private String description;
    private String imageUrl;
    private Long uploadUserId;
    private Promote promote;

    public WorkSpaceDTO() {}

    public WorkSpaceDTO(Long id, String name, String address, String type, Long rating, String description, String imageUrl, Long uploadUserId, Promote promote) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.type = type;
        this.rating = rating;
        this.description = description;
        this.imageUrl = imageUrl;
        this.uploadUserId = uploadUserId;
        this.promote = promote;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getUploadUserId() {
        return uploadUserId;
    }

    public void setUploadUserId(Long uploadUserId) {
        this.uploadUserId = uploadUserId;
    }

    public Promote getPromote() {
        return promote;
    }

    public void setPromote(Promote promote) {
        this.promote = promote;
    }

    @Override
    public String toString() {
        return "WorkSpaceDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", type='" + type + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", uploadUserId=" + uploadUserId +
                ", promote=" + promote +
                '}';
    }
}

