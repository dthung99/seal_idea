package com.dthung.sealidea.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dthung.sealidea.dtos.AccountDto;
import com.dthung.sealidea.dtos.ChangePasswordDto;
import com.dthung.sealidea.entity.Account;
import com.dthung.sealidea.security.CustomUserDetails;
import com.dthung.sealidea.service.AccountService;
import com.dthung.sealidea.util.AccountRegexValidationUtil;

@RestController
@RequestMapping("/api")
public class AuthenticationAPIController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerAPI(@RequestBody AccountDto accountDto) {
        // Check if the name satisfy the regex condition
        if (!AccountRegexValidationUtil.isValidEmail(accountDto.getEmail())) {
            return ResponseEntity.ok("Please use a valid email address.");
        }
        ;
        if (!AccountRegexValidationUtil.isValidPassword(accountDto.getPassword())) {
            return ResponseEntity.ok("Please use a valid password.");
        }
        ;

        // Check if the account exist before
        if (accountService.isAccountEmailAvailable(accountDto.getEmail())) {
            return ResponseEntity.ok("Email is already used");
        }
        ;

        // Save the username and the hashed password to db
        this.accountService.saveAccount(
                new Account(accountDto.getEmail(), accountDto.getEmail(),
                        this.passwordEncoder.encode(accountDto.getPassword())));
        return ResponseEntity.ok("Register success");
    }

    // Return msg to return on succesful login
    @GetMapping("/login_success")
    public ResponseEntity<String> login_success() {
        return ResponseEntity.ok("Login success");
    }

    // Return this if user try to access the service without login
    @GetMapping("/login_is_required")
    public ResponseEntity<String> login_is_required() {
        return ResponseEntity.ok("Login required");
    }

    // Return this if user success to logout
    @GetMapping("/logout_success")
    public ResponseEntity<String> logout_success() {
        return ResponseEntity.ok("Logout success");
    }

    // Return this if user success to logout
    @GetMapping("/personal/check_login")
    public ResponseEntity<String> check_login() {
        return ResponseEntity.ok("User is logged in");
    }

    // Change user's password
    @PostMapping("/update_password_in_back_end")
    public ResponseEntity<String> updatePasswordInBackEnd(@RequestBody ChangePasswordDto changePasswordDto) {
        // Check if the new password satisfy the regex condition
        if (!AccountRegexValidationUtil.isValidPassword(changePasswordDto.getNewPassword())) {
            return ResponseEntity.ok("Please use a valid password.");
        }
        ;
        // Get the current user and check if the password matchs
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() &&
                    !(authentication instanceof AnonymousAuthenticationToken)) {
                // Get the current user
                CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
                // Get current user account
                Account account = customUserDetails.getAccount();
                // Compare the previous password
                if (!this.passwordEncoder.matches(changePasswordDto.getOldPassword(), account.getHashPassword())) {
                    return ResponseEntity.ok("Old password is not correct!");
                }
                // Set new password
                account.setHashPassword(this.passwordEncoder.encode(changePasswordDto.getNewPassword()));
                this.accountService.saveAccount(account);
                return ResponseEntity.ok("Password updated success!");
            } else {
                return ResponseEntity.ok("Login is needed for this feature!");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("We have some server error!");
        }
    }
}
