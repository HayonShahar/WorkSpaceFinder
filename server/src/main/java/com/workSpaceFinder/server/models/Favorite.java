package com.workSpaceFinder.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    Long user_id;
    @Column(name = "work_space_id")
    Long workSpace_id;

    Favorite(){}

    public Favorite(Long user_id, Long workSpace_id) {
        this.user_id = user_id;
        this.workSpace_id = workSpace_id;
    }

    public Long getId() {
        return id;
    }

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

    @Override
    public String toString() {
        return "Favorite{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", workSpace_id=" + workSpace_id +
                '}';
    }
}
