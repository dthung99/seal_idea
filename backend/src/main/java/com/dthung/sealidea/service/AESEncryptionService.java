package com.dthung.sealidea.service;

// This code is credited to Claude.ai
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;

@Service
public class AESEncryptionService {

    private final String ALGORITHM = "AES";
    private final String SECRET_KEY_ALGORITHM = "PBKDF2WithHmacSHA256";
    private final int ITERATION_COUNT = 65536;
    private final int KEY_LENGTH = 256;

    public String generateRandom256BitStringKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256, SecureRandom.getInstanceStrong());
        return Base64.getEncoder().encodeToString(keyGen.generateKey().getEncoded());
    }

    public SecretKey stringTo256BitKey(String keyString) throws Exception {
        byte[] decodedKey = Base64.getDecoder().decode(keyString);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
    }

    public boolean isValid256AESKey(SecretKey key) {
        return key != null && "AES".equals(key.getAlgorithm()) && key.getEncoded().length == 32; // 256 bits = 32 bytes
    }

    public SecretKey generateKey(String password, byte[] salt) throws Exception {
        SecretKeyFactory factory = SecretKeyFactory.getInstance(SECRET_KEY_ALGORITHM);
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, ITERATION_COUNT, KEY_LENGTH);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), ALGORITHM);
    }

    public String encrypt(String plainText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public String decrypt(String encryptedText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
        return new String(decryptedBytes);
    }

    public byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    // Combine the above two function to encrypt
    public String encrypt_from_plainText_and_salt(String plainText, String password, byte[] salt)
            throws Exception {
        SecretKey key = generateKey(password, salt);
        return encrypt(plainText, key);
    }

    // Combine the above two function to decrypt
    public String decrypt_from_plainText_and_salt(String encryptedText, String password, byte[] salt)
            throws Exception {
        SecretKey key = generateKey(password, salt);
        return decrypt(encryptedText, key);
    }

}