package com.workSpaceFinder.server.dto;

import com.workSpaceFinder.server.models.User;

import java.util.Date;

public class UserDTO {
    private Long id;
    private String first_name;
    private String last_name;
    private String email;
    private Date dob;
    private String role;

    public UserDTO(Long id, String first_name, String last_name, String email, Date dob, String role) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.dob = dob;
        this.role = role;
    }

    public static UserDTO fromEntity(User user) {
        return new UserDTO(user.getId(), user.getFirst_name(), user.getLast_name(), user.getEmail(), user.getDob(), user.getRole());
    }

    public Long getId() {
        return id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public Date getDob() {
        return dob;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                ", role='" + role + '\'' +
                '}';
    }
}
