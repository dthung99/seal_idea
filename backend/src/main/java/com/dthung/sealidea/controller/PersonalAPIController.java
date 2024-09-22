package com.dthung.sealidea.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dthung.sealidea.dtos.AccountDataForSendingToUserDto;
import com.dthung.sealidea.dtos.KeyAndPostIdDto;
import com.dthung.sealidea.dtos.PostDataForSendingToUserDto;
import com.dthung.sealidea.dtos.PostIdDto;
import com.dthung.sealidea.dtos.PublicPostDto;
import com.dthung.sealidea.dtos.UsernameDto;
import com.dthung.sealidea.dtos.UserProfilePageForSendingToUserDto;
import com.dthung.sealidea.entity.Account;
import com.dthung.sealidea.entity.AccountSavedKey;
import com.dthung.sealidea.entity.PublicPost;
import com.dthung.sealidea.security.CustomUserDetails;
import com.dthung.sealidea.service.AccountService;
import com.dthung.sealidea.service.PublicPostService;
import com.dthung.sealidea.service.AccountSavedKeyService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api")
public class PersonalAPIController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private PublicPostService publicPostService;
    @Autowired
    private AccountSavedKeyService accountSavedKeyService;

    @PostMapping("/get_all_data_of_the_current_user")
    public ResponseEntity<UserProfilePageForSendingToUserDto> getAllDataOfTheCurrentUser(
            @RequestBody PublicPostDto publicPostDto) {
        try {
            // Get the current user, their details, and all relevant posts
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                AccountDataForSendingToUserDto accountDataForSendingToUserDto = new AccountDataForSendingToUserDto(
                        customUserDetails.getAccount());
                // Declare dto object
                UserProfilePageForSendingToUserDto userProfilePageDto = new UserProfilePageForSendingToUserDto();
                // Set account
                userProfilePageDto.setAccountDataForSendingToUserDto(accountDataForSendingToUserDto);
                // Select all posts that user stored
                List<AccountSavedKey> allUsersStoredPosts = this.accountSavedKeyService
                        .findAllByUserId(customUserDetails.getAccount().getUserId());
                // Loop through all post and classsify them
                List<PostDataForSendingToUserDto> userOwnedPosts = new ArrayList<>();
                List<PostDataForSendingToUserDto> userSavedPosts = new ArrayList<>();
                for (AccountSavedKey usersStoredPost : allUsersStoredPosts) {

                    // Check for null account
                    if (!(usersStoredPost.getPublicPost().getAccount() == null)) {
                        // Set the post that user owned
                        if (usersStoredPost.getAccount().getUserId() == usersStoredPost.getPublicPost().getAccount()
                                .getUserId()) {

                            PostDataForSendingToUserDto postDataForSendingToUserDto = new PostDataForSendingToUserDto(
                                    usersStoredPost.getPublicPost());
                            postDataForSendingToUserDto.setAccessKey(usersStoredPost.getAccessKey()); // Use the user
                                                                                                      // stored
                                                                                                      // key instead
                            userOwnedPosts.add(postDataForSendingToUserDto);
                            continue;
                        }

                    }
                    // Set the non-owned post that user stored keys
                    PostDataForSendingToUserDto postDataForSendingToUserDto = new PostDataForSendingToUserDto(
                            usersStoredPost.getPublicPost());
                    postDataForSendingToUserDto.setAccessKey(usersStoredPost.getAccessKey()); // Use the user stored key
                                                                                              // instead
                    userSavedPosts.add(postDataForSendingToUserDto);

                }
                // Set those post to the dto object
                userProfilePageDto.setUserOwnedPosts(userOwnedPosts);
                userProfilePageDto.setUserSavedPosts(userSavedPosts);
                return ResponseEntity.ok(userProfilePageDto);
            } else {
                // End if user is not logged in
                UserProfilePageForSendingToUserDto userProfilePageDto = new UserProfilePageForSendingToUserDto();
                return ResponseEntity.ok(userProfilePageDto);
            }
        } catch (

        Exception e) {
            UserProfilePageForSendingToUserDto userProfilePageDto = new UserProfilePageForSendingToUserDto();
            return ResponseEntity.ok(userProfilePageDto);
        }
    }

    @PostMapping("/save_key_to_user_profile")
    // Store a key and post to user profile
    public ResponseEntity<String> saveKeyToUserProfile(
            @RequestBody KeyAndPostIdDto keyAndPostIdDto) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get the AccountSavedKey for that user and that postId, and set the accessKey
                AccountSavedKey accountSavedKey = new AccountSavedKey(customUserDetails.getAccount(),
                        this.publicPostService.findPostById(keyAndPostIdDto.getPostId()).get());
                accountSavedKey.setAccessKey(keyAndPostIdDto.getKey());
                // Update the db
                this.accountSavedKeyService.save(accountSavedKey);
                return ResponseEntity.ok("Save key success!");
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }

    @PostMapping("/unsave_key_for_a_post")
    // Remove a key from user profile
    public ResponseEntity<String> unsaveKeyForAPost(
            @RequestBody PostIdDto postIdDto) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get the AccountSavedKey for that user and that postId, and set the accessKey
                AccountSavedKey accountSavedKey = new AccountSavedKey(customUserDetails.getAccount(),
                        this.publicPostService.findPostById(postIdDto.getPostId()).get());
                // Update the db
                this.accountSavedKeyService.delete(accountSavedKey.getId());
                return ResponseEntity.ok("Unsave success!");
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }

    @PostMapping("/change_username_of_account")
    // Change username
    public ResponseEntity<String> changeUsernameOfAccount(
            @RequestBody UsernameDto usernameDto) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()
                    && !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get the Account for the user
                Account account = customUserDetails.getAccount();
                // Set the new username
                account.setUsername(usernameDto.getUsername());
                // Update the db
                this.accountService.saveAccount(account);
                return ResponseEntity.ok("Username changed success!");
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }

    @PostMapping("/delete_one_post_from_back_end")
    // Delete a post of that user
    public ResponseEntity<String> deleteOnePostFromBackEnd(
            @RequestBody PostIdDto postIdDto) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get the desired post
                Optional<PublicPost> publicPostOptional = this.publicPostService.findPostById(postIdDto.getPostId());
                if (!publicPostOptional.isPresent()) {
                    return ResponseEntity.ok("No such post is available!");
                }
                if (publicPostOptional.get().getAccount().getUserId() == customUserDetails.getAccount().getUserId()) {
                    // Remove the post
                    this.publicPostService.deletePost(postIdDto.getPostId());
                    return ResponseEntity.ok("Post deleted success!");
                } else {
                    // Return error if user do not have permission
                    return ResponseEntity.ok("The user does not have permission!");
                }
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }

    @PostMapping("/upload_key_to_back_end")
    // Upload a new public key for the post
    public ResponseEntity<String> uploadKeyToBackEnd(
            @RequestBody KeyAndPostIdDto keyAndPostIdDto) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get the desired post
                Optional<PublicPost> publicPostOptional = this.publicPostService
                        .findPostById(keyAndPostIdDto.getPostId());
                if (!publicPostOptional.isPresent()) {
                    return ResponseEntity.ok("No such post is available!");
                }
                if (publicPostOptional.get().getAccount().getUserId() == customUserDetails.getAccount().getUserId()) {
                    // Update the post key
                    PublicPost publicPost = publicPostOptional.get();
                    publicPost.setAccessKey(keyAndPostIdDto.getKey());
                    this.publicPostService.savePublicPost(publicPost);
                    return ResponseEntity.ok("Upload success!");
                } else {
                    // Return error if user do not have permission
                    return ResponseEntity.ok("The user does not have permission!");
                }
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }

}
