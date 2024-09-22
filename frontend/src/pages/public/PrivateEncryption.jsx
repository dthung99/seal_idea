import React, { useState } from 'react'
import { encryptData } from '../../api_service/encryptData';
import { decryptData } from '../../api_service/decryptData';

import './PrivateEncryption.scss'

// function to copy to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied to clipboard: ', text);
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

const PrivateEncryption = () => {
  // Component for interactive website
  const [key, setKey] = useState('')
  const [text, setText] = useState('')
  const [outputText, setOutputText] = useState('\u00A0')
  const [errorMessage, setErrorMessage] = useState('\u00A0')

  // Generate 256-bit key
  const generateAESKey = async () => {
    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
      const exportedKey = await window.crypto.subtle.exportKey("raw", key);
      const keyBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(exportedKey)));
      setKey(keyBase64);
    } catch (error) {
      console.error("Error generating key:", error);
    }
  };

  // Function to handle encrypt button
  const handleEncryptButton = async () => {
    let result = await encryptData(key, text);
    if (result.msg == 'Encrypt Success!') {
      setOutputText(result.content);
      setErrorMessage(result.msg);
    } else {
      setErrorMessage(result.msg);
    };
  };

  // Function to handle decrypt button
  const handleDecryptButton = async () => {
    let result = await decryptData(key, text);
    if (result.msg == 'Decrypt Success!') {
      setOutputText(result.content);
      setErrorMessage(result.msg);
    } else {
      setErrorMessage(result.msg);
    };
  };

  return (
    <>
      <div className="private_encryption_main_layout">
        <div className="private_encryption_main_box">
          <div className="main_box-flex_box">
            <input type="text" className='main_box-text' value={key}
              onChange={(e) => setKey(e.target.value)} placeholder="Use a 256-bit key!" required />
            <div className="main_box-button" onClick={generateAESKey}>Generate</div>
            <div className="main_box-button" onClick={() => copyToClipboard(key)}>Copy</div>
          </div>
          <div className="main_box-text_title">Text to encrypt/decrypt (Character count: {text.length}/2047):</div>
          <textarea type="text" rows={15} className='main_box-text_input' value={text} maxLength={2047}
            onChange={(e) => setText(e.target.value)} placeholder="Main text (max 2047 characters)" required />
          <div className="main_box-text_error">{errorMessage}</div>

        </div>
        <div className="private_encryption_middle_box">
          <div className="transform_button" onClick={handleEncryptButton}>Encrypt</div>
          <div className="transform_button" onClick={handleDecryptButton}>Decrypt</div>
        </div>
        <div className="private_encryption_main_box">
          <div className="main_box-text_title">Output</div>
          <div className="main_box-text_input">{outputText}</div>
          <div className="main_box-flex_box">
            <div className="main_box-button" onClick={() => copyToClipboard(outputText)}>Copy Output To Clipboard!</div>
          </div>

        </div>

      </div>
    </>
  )
}

export const InfoPrivateEncryption = () => {
  return (
    <>
      <div className='info_panel_big_text'>This page allows you to encrypt messages using the AES-256 standard.</div>
      <br />
      <div className='info_panel_normal_text'>
        <i>Note:</i> The input key must be a Base64-encoded string that represents a 256-bit key. It’s recommended to generate the key here, copy the text, and use it for both encryption and decryption. Alternatively, you can convert your key to a Base64-encoded string using online tools like <a href='https://www.base64encode.org/'>Base64 Encode</a> or <a href='https://cryptii.com/pipes/binary-to-base64'>Cryptii</a>.
      </div>
      <br />
      <div className='info_panel_normal_text'>For more information about AES-256 encryption, click <a href='https://www.kiteworks.com/risk-compliance-glossary/aes-256-encryption/'>here</a>.</div>
    </>
  )
}

export default PrivateEncryption