package com.dthung.sealidea.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

// Create-connect to a table 
@Entity
@Table(name = "accounts", // Specify the table name here
        indexes = {
                @Index(name = "idx_email", columnList = "email") // Index for faster searches on email
        })
public class Account {
    // Define the columns
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "username", unique = false, nullable = false, length = 255)
    private String username;

    @Column(name = "hash_password", nullable = false, length = 255)
    private String hashPassword;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PublicPost> posts;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AccountSavedKey> savedKeys;

    // Constructor
    public Account() {
    }

    public Account(String email, String username, String hashPassword) {
        this.email = email;
        this.username = username;
        this.hashPassword = hashPassword;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public Set<AccountSavedKey> getSavedKeys() {
        return savedKeys;
    }

    public void setSavedKeys(Set<AccountSavedKey> savedKeys) {
        this.savedKeys = savedKeys;
    }

    public Set<PublicPost> getPosts() {
        return posts;
    }

    public void setPosts(Set<PublicPost> posts) {
        this.posts = posts;
    }

    // Helper method to manage bidirectional relationship
    // remove and post and add into set
    public void addPost(PublicPost post) {
        posts.add(post);
        post.setAccount(this);
    }

    public void removePost(PublicPost post) {
        posts.remove(post);
        post.setAccount(null);
    }

    public void addSavedKey(AccountSavedKey savedKey) {
        savedKeys.add(savedKey);
        savedKey.setAccount(this);
    }

    public void removeSavedKey(AccountSavedKey savedKey) {
        savedKeys.remove(savedKey);
        savedKey.setAccount(null);
    }

}
