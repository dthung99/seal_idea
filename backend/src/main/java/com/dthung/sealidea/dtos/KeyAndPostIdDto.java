package com.dthung.sealidea.dtos;

// So front end could send userinfo for register and login
public class KeyAndPostIdDto {
    private String key;
    private Long postId;

    // Constructor + Getters and Setters
    public KeyAndPostIdDto() {
    }

    public KeyAndPostIdDto(String key, Long postId) {
        this.key = key;
        this.postId = postId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

}