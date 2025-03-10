package com.workSpaceFinder.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "work_spaces")
public class WorkSpace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;
    private String address;
    private String type;
    private Long rating;
    private String description;
    private String image_url;
    private Long upload_user_id;

    public WorkSpace(){}

    public WorkSpace(String name, String address, String type, Long rating, String description, String image_url, Long upload_user_id) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.rating = rating;
        this.description = description;
        this.image_url = image_url;
        this.upload_user_id = upload_user_id;
    }

    public Long getId() {
        return id;
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

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Long getUpload_user_id() {
        return upload_user_id;
    }

    public void setUpload_user_id(Long upload_user_id) {
        this.upload_user_id = upload_user_id;
    }

    @Override
    public String toString() {
        return "WorkSpace{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", type='" + type + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", image_url='" + image_url + '\'' +
                ", upload_user_id=" + upload_user_id +
                '}';
    }
}
