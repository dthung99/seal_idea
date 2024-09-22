package com.dthung.sealidea.service;

import com.dthung.sealidea.entity.AccountSavedKey;
import com.dthung.sealidea.entity.AccountSavedKeyId;
import com.dthung.sealidea.repository.AccountSavedKeyRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountSavedKeyService {

    @Autowired
    private AccountSavedKeyRepository accountSavedKeyRepository;

    public AccountSavedKey save(AccountSavedKey accountSavedKey) {
        return accountSavedKeyRepository.save(accountSavedKey);
    }

    public void delete(AccountSavedKeyId id) {
        accountSavedKeyRepository.deleteById(id);
    }

    public AccountSavedKey findById(AccountSavedKeyId id) {
        return accountSavedKeyRepository.findById(id).orElse(null);
    }

    public List<AccountSavedKey> findAll() {
        return accountSavedKeyRepository.findAll();
    }

    public List<AccountSavedKey> findAllByUserId(Long userId) {
        return accountSavedKeyRepository.findAllByAccount_UserId(userId);
    }

    public List<AccountSavedKey> findAllByPostId(Long postId) {
        return accountSavedKeyRepository.findAllByPublicPost_PostId(postId);
    }

}