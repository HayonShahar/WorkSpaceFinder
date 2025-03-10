package com.workSpaceFinder.server.models;

import jakarta.persistence.*;

@Entity

public class PromoteRoll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Role role;

    public PromoteRoll(){}

    public enum Role {
        BASIC, STANDARD, PREMIUM
    }

    public PromoteRoll(Role role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "PromoteRoll{" +
                "id=" + id +
                ", role=" + role +
                '}';
    }
}
