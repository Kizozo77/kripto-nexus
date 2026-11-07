// 1. RC4 (KSA & PRGA Keystream Engine)
export function processRC4(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };

    // KSA (Key Scheduling Algorithm)
    const S = Array.from({ length: 256 }, (_, i) => i);
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
      [S[i], S[j]] = [S[j], S[i]];
    }

    // PRGA & XOR Transformation
    let i = 0;
    j = 0;
    let inputBytes = [];

    if (isEncrypt) {
      inputBytes = Array.from(text).map((c) => c.charCodeAt(0));
    } else {
      // Decode dari hex
      const cleanHex = text.replace(/\s+/g, "");
      if (cleanHex.length % 2 !== 0) return { success: false, error: "Format Hex dekripsi tidak valid (harus genap)." };
      for (let k = 0; k < cleanHex.length; k += 2) {
        inputBytes.push(parseInt(cleanHex.substr(k, 2), 16));
      }
    }

    const outBytes = [];
    for (const byte of inputBytes) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
      [S[i], S[j]] = [S[j], S[i]];
      const K = S[(S[i] + S[j]) % 256];
      outBytes.push(byte ^ K);
    }

    if (isEncrypt) {
      const hexResult = outBytes.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" ");
      return { success: true, result: hexResult };
    } else {
      const textResult = String.fromCharCode(...outBytes);
      return { success: true, result: textResult };
    }
  } catch (err) {
    return { success: false, error: "Error RC4: " + err.message };
  }
}

// 2. One-Time Pad (XOR Bitwise Mutlak)
export function processOTP(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };

    if (isEncrypt) {
      if (key.length < text.length) {
        return { success: false, error: `Panjang kunci (${key.length}) harus minimal sama dengan panjang pesan (${text.length}).` };
      }
      const outHex = [];
      for (let i = 0; i < text.length; i++) {
        outHex.push((text.charCodeAt(i) ^ key.charCodeAt(i)).toString(16).padStart(2, "0").toUpperCase());
      }
      return { success: true, result: outHex.join(" ") };
    } else {
      const cleanHex = text.trim().split(/\s+/);
      if (key.length < cleanHex.length) {
        return { success: false, error: "Panjang kunci kurang dari total byte cipher." };
      }
      let result = "";
      for (let i = 0; i < cleanHex.length; i++) {
        const byte = parseInt(cleanHex[i], 16);
        result += String.fromCharCode(byte ^ key.charCodeAt(i));
      }
      return { success: true, result };
    }
  } catch (err) {
    return { success: false, error: "Error OTP: " + err.message };
  }
}

// 3. Autokey Cipher (ASCII Modulo 128)
export function processAutokey(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };

    if (isEncrypt) {
      const fullKeystream = key + text;
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const p = text.charCodeAt(i);
        const k = fullKeystream.charCodeAt(i);
        const c = (p + k) % 128;
        result += String.fromCharCode(c);
      }
      return { success: true, result };
    } else {
      let currentKey = key;
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i);
        const k = currentKey.charCodeAt(i);
        let p = (c - k) % 128;
        if (p < 0) p += 128;
        const char = String.fromCharCode(p);
        result += char;
        currentKey += char; // Keystream diperpanjang oleh plaintext hasil rekonstruksi
      }
      return { success: true, result };
    }
  } catch (err) {
    return { success: false, error: "Error Autokey: " + err.message };
  }
}
