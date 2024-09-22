package com.dthung.sealidea.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Table;

@Entity
@Table(name = "account_saved_keys") // Specify the table name here
public class AccountSavedKey {

    @EmbeddedId
    private AccountSavedKeyId id;

    @ManyToOne
    @MapsId("userId") // Maps the userId in the embedded ID
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne
    @MapsId("postId") // Maps the userId in the embedded ID
    @JoinColumn(name = "post_id")
    private PublicPost publicPost;

    @Column(name = "access_key", nullable = true, length = 63) // User stored key
    private String accessKey = null;

    // Constructors, Getters and Setters. No setters for Id
    public AccountSavedKey() {
    }

    public AccountSavedKey(Account account, PublicPost publicPost) {
        this.account = account;
        this.publicPost = publicPost;
        this.id = new AccountSavedKeyId(account.getUserId(), publicPost.getPostId());
    }

    public AccountSavedKeyId getId() {
        return id;
    }

    public Account getAccount() {
        return account;
    }

    public PublicPost getPublicPost() {
        return publicPost;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    // Add this method to help manage the bidirectional relationship
    public void setAccount(Account account) {
        this.account = account;
        if (account != null) {
            account.getSavedKeys().add(this);
        }
    }

    public void setPublicPost(PublicPost publicPost) {
        this.publicPost = publicPost;
        if (publicPost != null) {
            publicPost.getAccountSavedKeys().add(this);
        }
    }

}