package com.dthung.sealidea.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dthung.sealidea.entity.PublicPost;
import com.dthung.sealidea.service.AESEncryptionService;
import com.dthung.sealidea.service.PublicPostService;

@RestController
@RequestMapping("/dev_api")
public class DevAPIController {
    @Autowired
    private PublicPostService publicPostService;
    @Autowired
    private AESEncryptionService aesEncryptionService;

    // Decrypt content with id and key
    @GetMapping("/get_post")
    public ResponseEntity<String> decryptDataWithKeyAndPostId(@RequestParam String postId,
            @RequestParam(required = false) String key) {
        long postId_long;
        // Cast the postId from string to long
        try {
            postId_long = Long.parseLong(postId);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post ID needs to be an integer!");
        }

        try {
            // Access the post to get the post content and salt
            Optional<PublicPost> publicPostOptional = this.publicPostService.findPostById(postId_long);
            if (!publicPostOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post ID does not exist!");
            }
            // Get the encrypted msg
            String result = publicPostOptional.get().getPostContent();
            // Decrypt the msg if user provide a key
            if (key == null) {
                return ResponseEntity.ok(result);
            }
            // Decrypt the msg if user provide a key
            try {
                result = this.aesEncryptionService.decrypt_from_plainText_and_salt(result,
                        key, publicPostOptional.get().getServerRandomSalt());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The key might not be valid!");
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("We have some server error!");
        }
    }
}