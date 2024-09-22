package com.dthung.sealidea.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dthung.sealidea.entity.Account;
import com.dthung.sealidea.repository.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository; // Inject the dependency

    // Save an account (update if exist, create new if not)
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    // Get all accounts
    public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

    // Find an account by ID
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

    // Delete an account by ID
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    // Find an account by email
    public Optional<Account> findAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    // Check if an account exists by email
    public boolean isAccountEmailAvailable(String email) {
        return accountRepository.findByEmail(email).isPresent();
    }
}
