package com.dthung.sealidea.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dthung.sealidea.entity.PublicPost;

@Repository
public interface PublicPostRepository extends JpaRepository<PublicPost, Long> {
    // Used for retrieve user
    PublicPost findByDateCreated(LocalDateTime dateCreated);

    // JPA derived query method to get post on Page
    // The latest post are on first page!
    Page<PublicPost> findAllByOrderByDateCreatedDesc(Pageable pageable);

    // Custom method to retrieve posts ordered by dateCreated
    default List<PublicPost> findPostsOrderedByDate(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return findAllByOrderByDateCreatedDesc(pageable).getContent();
    }
}