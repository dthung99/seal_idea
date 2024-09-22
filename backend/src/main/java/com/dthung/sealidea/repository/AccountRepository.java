package com.dthung.sealidea.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dthung.sealidea.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    // Used for retrieve user
    Optional<Account> findByEmail(String email);
}