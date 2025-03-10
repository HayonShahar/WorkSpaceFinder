package com.workSpaceFinder.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "promote")
public class Promote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "work_space_id")
    private Long workSpaceId;
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "promote_roll_id")
    private PromoteRoll promoteRoll;  // הקשר עם טבלת promote_roll

    public Promote(){}

    public Promote(Long workSpaceId, Long userId, PromoteRoll promoteRoll) {
        this.workSpaceId = workSpaceId;
        this.userId = userId;
        this.promoteRoll = promoteRoll;
    }

    public Long getId() {
        return id;
    }

    public Long getWorkSpaceId() {
        return workSpaceId;
    }

    public void setWorkSpaceId(Long workSpaceId) {
        this.workSpaceId = workSpaceId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public PromoteRoll getPromoteRoll() {
        return promoteRoll;
    }

    public void setPromoteRoll(PromoteRoll promoteRoll) {
        this.promoteRoll = promoteRoll;
    }

    @Override
    public String toString() {
        return "Promote{" +
                "id=" + id +
                ", workSpaceId=" + workSpaceId +
                ", userId=" + userId +
                ", promoteRoll=" + promoteRoll +
                '}';
    }
}
