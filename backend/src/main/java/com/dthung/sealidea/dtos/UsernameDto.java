package com.dthung.sealidea.dtos;

public class UsernameDto {
    private String username;

    // Default constructor
    public UsernameDto() {
    }

    // Constructor with parameters
    public UsernameDto(String username) {
        this.username = username;
    }

    // Getter and Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}