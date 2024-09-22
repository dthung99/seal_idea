package com.dthung.sealidea.dtos;

// So front end could send the posts to backend for storage

public class PublicPostDto {
    private String title;
    private String description;
    private String data;
    private String key;
    private boolean isPublic;
    private boolean isStoredToProfile;

    // Constructor + Getters and Setters
    public PublicPostDto() {
    }

    public PublicPostDto(String title, String description, String data, String key, boolean isPublic,
            boolean isStoredToProfile) {
        this.title = title;
        this.description = description;
        this.data = data;
        this.key = key;
        this.isPublic = isPublic;
        this.isStoredToProfile = isStoredToProfile;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public boolean getIsStoredToProfile() {
        return isStoredToProfile;
    }

    public void setIsStoredToProfile(boolean isStoredToProfile) {
        this.isStoredToProfile = isStoredToProfile;
    }

}