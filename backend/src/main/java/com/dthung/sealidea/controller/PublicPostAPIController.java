package com.dthung.sealidea.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dthung.sealidea.dtos.CurrentPageNumberDto;
import com.dthung.sealidea.dtos.DecryptMsgToSendBackDto;
import com.dthung.sealidea.dtos.KeyAndPostIdDto;
import com.dthung.sealidea.dtos.KeyAndTextDto;
import com.dthung.sealidea.dtos.PostDataForSendingToUserDto;
import com.dthung.sealidea.dtos.PostIdDto;
import com.dthung.sealidea.dtos.PublicPostDto;
import com.dthung.sealidea.entity.AccountSavedKey;
import com.dthung.sealidea.entity.PublicPost;
import com.dthung.sealidea.security.CustomUserDetails;
import com.dthung.sealidea.service.AESEncryptionService;
import com.dthung.sealidea.service.PublicPostService;
import com.dthung.sealidea.service.AccountSavedKeyService;
import com.dthung.sealidea.util.ValidateUserInputForPostUtil;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api")
public class PublicPostAPIController {
    @Autowired
    private PublicPostService publicPostService;
    @Autowired
    private AESEncryptionService aesEncryptionService;
    @Autowired
    private AccountSavedKeyService accountSavedKeyService;

    @PostMapping("/add_new_post")
    public ResponseEntity<String> registerAPI(@RequestBody PublicPostDto publicPostDto) {

        // Basic user input checking
        if (!ValidateUserInputForPostUtil.check_user_string_input_with_limit(publicPostDto.getTitle(), 127)) {
            return ResponseEntity.ok("Invalid Title");
        }
        if (!ValidateUserInputForPostUtil.check_user_string_input_with_limit(publicPostDto.getDescription(), 255)) {
            return ResponseEntity.ok("Invalid Description");
        }
        if (!ValidateUserInputForPostUtil.check_user_string_input_with_limit(publicPostDto.getData(), 1023)) {
            return ResponseEntity.ok("Invalid Content");
        }
        if (!ValidateUserInputForPostUtil.check_user_string_input_with_limit(publicPostDto.getKey(), 63)) {
            return ResponseEntity.ok("Invalid Key");
        }
        // Encrypt the data and save the username and the hashed password to db
        // Generate a random salt for hashing user's password (user's input key)
        byte[] salt = this.aesEncryptionService.generateSalt();
        // Generate a 256 bit encryption key using user the salt and user key, and then
        // encrypt the data
        try {
            String encrypted_data = this.aesEncryptionService.encrypt_from_plainText_and_salt(publicPostDto.getData(),
                    publicPostDto.getKey(), salt);
            // Save the new post to db
            PublicPost newPost = new PublicPost(publicPostDto.getTitle(), publicPostDto.getDescription(),
                    encrypted_data, salt);
            // Store the key if user opt in for making it public
            if (publicPostDto.getIsPublic()) {
                newPost.setAccessKey(publicPostDto.getKey());
            }
            // Get the current user and link it to user id
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Set the creater of the post
                newPost.setAccount(customUserDetails.getAccount());
                // Save the account first so it create an ID
                this.publicPostService.savePublicPost(newPost);
                // Store the post into user profile (in account saved keys)
                AccountSavedKey accountSavedKey = new AccountSavedKey(customUserDetails.getAccount(), newPost);
                // Store the saved key if user opt so
                if (publicPostDto.getIsStoredToProfile()) {
                    accountSavedKey.setAccessKey(publicPostDto.getKey());
                }
                this.accountSavedKeyService.save(accountSavedKey);
            } else {
                // Save a post with no user_id
                this.publicPostService.savePublicPost(newPost);
            }
            return ResponseEntity.ok("Adding new post success");
        } catch (Exception e) {
            return ResponseEntity.ok("Can not encrypt the data, something is wrong!!!");
        }
    }

    // Get all the posts in one page for user to visualize
    @PostMapping("/get_posts_on_page")
    public ResponseEntity<List<PostDataForSendingToUserDto>> getPostsOnPage(
            @RequestBody CurrentPageNumberDto currentPageNumberDto) {
        try {
            List<PublicPost> listOfPosts = this.publicPostService
                    .findPostsOnPage(currentPageNumberDto.getCurrentPageNumber(), currentPageNumberDto.getSizeOfPage());
            // Create a new list to hold PostDataForSendingToUserDto
            List<PostDataForSendingToUserDto> listOfPostDtos = new ArrayList<>();
            // Loop through the list and update
            for (PublicPost post : listOfPosts) {
                PostDataForSendingToUserDto postDto = new PostDataForSendingToUserDto(post);
                listOfPostDtos.add(postDto);
            }
            return ResponseEntity.ok(listOfPostDtos);
        } catch (Exception e) {
            List<PostDataForSendingToUserDto> listOfPostDtos = new ArrayList<>();
            return ResponseEntity.ok(listOfPostDtos);
        }
    }

    // Get one post with an id
    @PostMapping("/get_one_post_with_id")
    public ResponseEntity<PostDataForSendingToUserDto> getOnePostWithId(@RequestBody PostIdDto postIdDto) {
        try {
            Optional<PublicPost> publicPost = this.publicPostService.findPostById(postIdDto.getPostId());
            if (publicPost.isPresent()) {
                PostDataForSendingToUserDto result = new PostDataForSendingToUserDto(publicPost.get());
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
        }
        PostDataForSendingToUserDto result = null;
        return ResponseEntity.ok(result);
    }

    // Decrypt content with id and key
    @PostMapping("/decrypt_data_with_key_and_post_id")
    public ResponseEntity<String> decryptDataWithKeyAndPostId(@RequestBody KeyAndPostIdDto keyAndPostIdDto) {
        try {
            // Access the post to get the post content and salt
            PublicPost publicPost = this.publicPostService.findPostById(keyAndPostIdDto.getPostId()).get();
            // Decrypt the message
            String result = this.aesEncryptionService.decrypt_from_plainText_and_salt(publicPost.getPostContent(),
                    keyAndPostIdDto.getKey(), publicPost.getServerRandomSalt());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.ok("");
        }
    }

    // Encrypt a general content with 256bit key and text
    @PostMapping("/encrypt_data_with_key")
    public ResponseEntity<DecryptMsgToSendBackDto> encryptData(@RequestBody KeyAndTextDto keyAndTextDto) {
        DecryptMsgToSendBackDto decryptMsgToSendBackDto = new DecryptMsgToSendBackDto();
        // Basic checking for input text
        if (keyAndTextDto.getText().length() > 2047) {
            decryptMsgToSendBackDto.setMsg("Text is too long");
            return ResponseEntity.ok(decryptMsgToSendBackDto);
        }
        try {
            // Validate the key
            SecretKey key;
            try {
                key = this.aesEncryptionService.stringTo256BitKey(keyAndTextDto.getKey());
            } catch (Exception e) {
                decryptMsgToSendBackDto.setMsg("Invalid Key!");
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            }
            if (!(this.aesEncryptionService.isValid256AESKey(key))) {
                decryptMsgToSendBackDto.setMsg("Invalid Key!");
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            }
            ;
            // Encrypt the data
            String result = this.aesEncryptionService.encrypt(keyAndTextDto.getText(), key);
            decryptMsgToSendBackDto.setMsg("Encrypt Success!");
            decryptMsgToSendBackDto.setContent(result);
            return ResponseEntity.ok(decryptMsgToSendBackDto);
        } catch (Exception e) {
            decryptMsgToSendBackDto.setMsg("Server Error!");
            return ResponseEntity.ok(decryptMsgToSendBackDto);
        }
    }

    // Decrypt a general content with 256bit key and text
    @PostMapping("/decrypt_data_with_key")
    public ResponseEntity<DecryptMsgToSendBackDto> decryptData(@RequestBody KeyAndTextDto keyAndTextDto) {
        DecryptMsgToSendBackDto decryptMsgToSendBackDto = new DecryptMsgToSendBackDto();
        // Basic checking for input text
        if (keyAndTextDto.getText().length() > 2047) {
            decryptMsgToSendBackDto.setMsg("Text is too long");
            return ResponseEntity.ok(decryptMsgToSendBackDto);
        }
        try {
            // Validate the key
            SecretKey key;
            try {
                key = this.aesEncryptionService.stringTo256BitKey(keyAndTextDto.getKey());
            } catch (Exception e) {
                decryptMsgToSendBackDto.setMsg("Invalid Key!");
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            }
            if (!(this.aesEncryptionService.isValid256AESKey(key))) {
                decryptMsgToSendBackDto.setMsg("Invalid Key!");
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            }
            ;
            try {
                // Decrypt the data
                String result = this.aesEncryptionService.decrypt(keyAndTextDto.getText(), key);
                decryptMsgToSendBackDto.setMsg("Decrypt Success!");
                decryptMsgToSendBackDto.setContent(result);
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            } catch (Exception e) {
                decryptMsgToSendBackDto.setMsg("Decrypt Failed!");
                return ResponseEntity.ok(decryptMsgToSendBackDto);
            }
        } catch (Exception e) {
            decryptMsgToSendBackDto.setMsg("Server Error!");
            return ResponseEntity.ok(decryptMsgToSendBackDto);
        }
    }
}
