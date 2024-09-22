package com.dthung.sealidea.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class AccountSavedKeyId implements Serializable {
    private Long userId;
    private Long postId;

    // Default constructor
    public AccountSavedKeyId() {
    }

    // Constructor
    public AccountSavedKeyId(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
    }

    // Getters, equals, and hashCode methods
    public Long getUserId() {
        return userId;
    }

    public Long getPostId() {
        return postId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof AccountSavedKeyId))
            return false;
        AccountSavedKeyId that = (AccountSavedKeyId) o;
        return Objects.equals(this.userId, that.userId) &&
                Objects.equals(this.postId, that.postId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, postId);
    }
}
