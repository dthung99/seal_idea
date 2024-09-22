package com.dthung.sealidea.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "public_posts", indexes = {
        @Index(name = "idx_date_created", columnList = "date_created") }) // Specify the table name here
public class PublicPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne // Establishing the relationship with Account table
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = true)
    private Account account;

    @Column(name = "post_title", nullable = false, length = 127)
    private String postTitle;

    @Column(name = "post_description", nullable = false, length = 255)
    private String postDescription;

    @Column(name = "post_content", nullable = false, length = 2047)
    private String postContent;

    @Column(name = "server_random_salt", nullable = false) // Used for generating 256-bit key
    private byte[] serverRandomSalt;

    @Column(name = "access_key", nullable = true, length = 63) // User key, it's optional, depending on whether the
                                                               // owner decided to publish it or not
    private String accessKey;

    @Column(name = "number_of_like", nullable = false)
    private int numberOfLike = 0; // Initialize with default value

    @Column(name = "date_created", nullable = false)
    private LocalDateTime dateCreated = LocalDateTime.now(); // Initialize with the current date and time

    @OneToMany(mappedBy = "publicPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AccountSavedKey> accountSavedKeys;

    // Constructor, Getters and Setters
    public PublicPost() {
    }

    public PublicPost(String postTitle, String postDescription, String postContent,
            byte[] serverRandomSalt) {
        this.postTitle = postTitle;
        this.postDescription = postDescription;
        this.postContent = postContent;
        this.serverRandomSalt = serverRandomSalt;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public byte[] getServerRandomSalt() {
        return serverRandomSalt;
    }

    public void setServerRandomSalt(byte[] serverRandomSalt) {
        this.serverRandomSalt = serverRandomSalt;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public int getNumberOfLike() {
        return numberOfLike;
    }

    public void setNumberOfLike(int numberOfLike) {
        this.numberOfLike = numberOfLike;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Set<AccountSavedKey> getAccountSavedKeys() {
        return accountSavedKeys;
    }

    public void setAccountSavedKeys(Set<AccountSavedKey> accountSavedKeys) {
        this.accountSavedKeys = accountSavedKeys;
    }

    // Helper methods to manage bidirectional relationship with AccountSavedKey
    public void addAccountSavedKey(AccountSavedKey savedKey) {
        accountSavedKeys.add(savedKey);
        savedKey.setPublicPost(this);
    }

    public void removeAccountSavedKey(AccountSavedKey savedKey) {
        accountSavedKeys.remove(savedKey);
        savedKey.setPublicPost(null);
    }

}
