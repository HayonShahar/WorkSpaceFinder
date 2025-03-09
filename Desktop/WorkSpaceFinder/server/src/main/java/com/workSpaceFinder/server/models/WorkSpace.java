package com.workSpaceFinder.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


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
    private Long noise_level;
    private String description;
    private String image_url;

    public WorkSpace(){}

    public WorkSpace(String name, String address, String type, Long rating, Long noise_level, String description, String image_url) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.rating = rating;
        this.noise_level = noise_level;
        this.description = description;
        this.image_url = image_url;
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

    public Long getNoise_level() {
        return noise_level;
    }

    public void setNoise_level(Long noise_level) {
        this.noise_level = noise_level;
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

    @Override
    public String toString() {
        return "WorkSpace{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", type='" + type + '\'' +
                ", rating=" + rating +
                ", noise_level=" + noise_level +
                ", description='" + description + '\'' +
                ", image_url='" + image_url + '\'' +
                '}';
    }
}
