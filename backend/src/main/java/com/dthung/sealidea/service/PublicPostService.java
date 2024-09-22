package com.dthung.sealidea.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dthung.sealidea.entity.PublicPost;
import com.dthung.sealidea.repository.PublicPostRepository;

@Service
public class PublicPostService {

    @Autowired
    private PublicPostRepository publicPostRepository; // Inject the dependency

    // Save an account (update if exist, create new if not)
    public PublicPost savePublicPost(PublicPost publicPost) {
        return publicPostRepository.save(publicPost);
    }

    // Get all accounts
    public List<PublicPost> findAllPublicPosts() {
        return publicPostRepository.findAll();
    }

    // Find an account by ID
    public Optional<PublicPost> findPostById(Long id) {
        return publicPostRepository.findById(id);
    }

    // Delete an account by ID
    public void deletePost(Long id) {
        publicPostRepository.deleteById(id);
    }

    // Get some posts on some page
    public List<PublicPost> findPostsOnPage(int pageNumber, int pageSize) {
        return publicPostRepository.findPostsOrderedByDate(pageNumber, pageSize);
    }
}
