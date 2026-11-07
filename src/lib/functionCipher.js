import CryptoJS from "crypto-js";

// 1. Kerahasiaan (Confidentiality) - Caesar Cipher Modulo 26
export function processCaesar(text, shift, isEncrypt) {
  try {
    if (!text) return { success: false, error: "Teks wajib diisi." };
    const s = (parseInt(shift) || 3) % 26;
    const finalShift = isEncrypt ? s : (26 - s) % 26;

    let result = "";
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 + finalShift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 + finalShift) % 26) + 97);
      } else {
        result += text[i];
      }
    }
    return { success: true, result };
  } catch (err) {
    return { success: false, error: "Error Caesar: " + err.message };
  }
}

// 2. Integritas Data (Integrity) - SHA-256 One-Way Hash Digest
export function processSHA256(text) {
  try {
    if (!text) return { success: false, error: "Masukkan teks untuk digenerate digestnya." };
    const hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
    return { success: true, result: hash };
  } catch (err) {
    return { success: false, error: "Error SHA-256: " + err.message };
  }
}

// 3. Otentikasi Pengirim (Authenticity) - HMAC SHA-256
export function processHMAC(text, secretKey) {
  try {
    if (!text || !secretKey) return { success: false, error: "Teks dan Secret Key bersama wajib diisi." };
    const hmac = CryptoJS.HmacSHA256(text, secretKey).toString(CryptoJS.enc.Hex);
    return { success: true, result: hmac };
  } catch (err) {
    return { success: false, error: "Error HMAC: " + err.message };
  }
}
