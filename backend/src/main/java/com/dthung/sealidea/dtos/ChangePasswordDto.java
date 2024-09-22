package com.dthung.sealidea.dtos;

// So front end could send userinfo for register and login
public class ChangePasswordDto {
    private String oldPassword;
    private String newPassword;
    private String password;

    // Constructor + Getters and Setters

    public ChangePasswordDto() {
    }

    public ChangePasswordDto(String oldPassword, String newPassword, String password) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}