package com.dthung.sealidea.dtos;

import java.util.List;

public class UserProfilePageForSendingToUserDto {
    private AccountDataForSendingToUserDto accountDataForSendingToUserDto;
    private List<PostDataForSendingToUserDto> userOwnedPosts;
    private List<PostDataForSendingToUserDto> userSavedPosts;

    // Constructors, getters and setters
    public UserProfilePageForSendingToUserDto() {
    }

    public AccountDataForSendingToUserDto getAccountDataForSendingToUserDto() {
        return accountDataForSendingToUserDto;
    }

    public void setAccountDataForSendingToUserDto(AccountDataForSendingToUserDto accountDataForSendingToUserDto) {
        this.accountDataForSendingToUserDto = accountDataForSendingToUserDto;
    }

    public List<PostDataForSendingToUserDto> getUserOwnedPosts() {
        return userOwnedPosts;
    }

    public void setUserOwnedPosts(List<PostDataForSendingToUserDto> userOwnedPosts) {
        this.userOwnedPosts = userOwnedPosts;
    }

    public List<PostDataForSendingToUserDto> getUserSavedPosts() {
        return userSavedPosts;
    }

    public void setUserSavedPosts(List<PostDataForSendingToUserDto> userSavedPosts) {
        this.userSavedPosts = userSavedPosts;
    }

}
