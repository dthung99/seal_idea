package com.dthung.sealidea.dtos;

import com.dthung.sealidea.entity.Account;

// So front end could send userinfo for register and login
public class AccountDataForSendingToUserDto {
    private String email;
    private String username;

    // Constructor + Getters and Setters
    public AccountDataForSendingToUserDto() {
    }

    public AccountDataForSendingToUserDto(String email, String username) {
        this.email = email;
        this.username = username;
    }

    public AccountDataForSendingToUserDto(Account account) {
        this.email = account.getEmail();
        this.username = account.getUsername();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}