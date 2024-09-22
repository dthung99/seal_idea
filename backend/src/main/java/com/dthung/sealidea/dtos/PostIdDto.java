package com.dthung.sealidea.dtos;

// So front end could send userinfo for register and login
public class PostIdDto {
    private long postId;

    // Constructor + Getters and Setters

    public PostIdDto() {
    }

    public PostIdDto(long postId) {
        this.postId = postId;
    }

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }
}