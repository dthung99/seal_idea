package com.dthung.sealidea.util;

// Check if the account and password match the regex pattern
public class ValidateUserInputForPostUtil {
    public static boolean check_user_string_input_with_limit(String text, int upper_limit) {
        // Check if a string is within a length
        if (text.length() <= upper_limit && text.trim().length() > 0) {
            return true;
        }
        return false;
    }
}
