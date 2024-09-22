package com.dthung.sealidea.repository;

import com.dthung.sealidea.entity.AccountSavedKey;
import com.dthung.sealidea.entity.AccountSavedKeyId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountSavedKeyRepository extends JpaRepository<AccountSavedKey, AccountSavedKeyId> {
    // Find rows for userId
    List<AccountSavedKey> findAllByAccount_UserId(Long userId);

    // Find rows for postId
    List<AccountSavedKey> findAllByPublicPost_PostId(Long postId);
}