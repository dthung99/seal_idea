package com.dthung.sealidea.dtos;

// So front end could send userinfo for register and login
public class KeyAndTextDto {
    private String key;
    private String text;

    // Constructor + Getters and Setters
    public KeyAndTextDto() {
    }

    public KeyAndTextDto(String key, String text) {
        this.key = key;
        this.text = text;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}