package com.dthung.sealidea.util;

import java.util.regex.Pattern;

// Check if the account and password match the regex pattern
public class AccountRegexValidationUtil {
    public static final String EMAIL_REGEX = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&\\(\\)\\{\\}\\[\\]:;<>,.?\\\\\\/~_+\\-=\\|]).{8,}$";

    public static boolean isValidEmail(String email) {
        return Pattern.matches(EMAIL_REGEX, email);
    }

    public static boolean isValidPassword(String password) {
        return Pattern.matches(PASSWORD_REGEX, password);
    }
}
