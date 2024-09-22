package com.dthung.sealidea.dtos;

import java.time.LocalDateTime;

import com.dthung.sealidea.entity.PublicPost;

// So front end could send the posts to backend for storage

public class PostDataForSendingToUserDto {
    private Long postId;
    private String username;
    private String postTitle;
    private String postDescription;
    private String postContent;
    private String accessKey;
    private int numberOfLike = 0; // Initialize with default value
    private LocalDateTime dateCreated; // Initialize with the current date and time

    // Constructor + Getters and Setters
    public PostDataForSendingToUserDto() {
    }

    public PostDataForSendingToUserDto(PublicPost publicPost) {
        this.postId = publicPost.getPostId();
        this.username = publicPost.getAccount() != null ? publicPost.getAccount().getUsername() : null;
        this.postTitle = publicPost.getPostTitle();
        this.postDescription = publicPost.getPostDescription();
        this.postContent = publicPost.getPostContent();
        this.accessKey = publicPost.getAccessKey() != null ? publicPost.getAccessKey() : null;
        this.numberOfLike = publicPost.getNumberOfLike();
        this.dateCreated = publicPost.getDateCreated();
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public int getNumberOfLike() {
        return numberOfLike;
    }

    public void setNumberOfLike(int numberOfLike) {
        this.numberOfLike = numberOfLike;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

}