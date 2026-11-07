import CryptoJS from "crypto-js";

// 1. AES (Advanced Encryption Standard - 128/256-bit)
export function processAES(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };
    if (isEncrypt) {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      return { success: true, result: encrypted };
    } else {
      const bytes = CryptoJS.AES.decrypt(text, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) return { success: false, error: "Gagal dekripsi: Kunci salah atau format rusak." };
      return { success: true, result: decrypted };
    }
  } catch (err) {
    return { success: false, error: "Error komputasi AES: " + err.message };
  }
}

// 2. DES (Data Encryption Standard - Jaringan Feistel 64-bit)
export function processDES(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };
    if (isEncrypt) {
      const encrypted = CryptoJS.DES.encrypt(text, key).toString();
      return { success: true, result: encrypted };
    } else {
      const bytes = CryptoJS.DES.decrypt(text, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) return { success: false, error: "Gagal dekripsi: Kunci salah atau format rusak." };
      return { success: true, result: decrypted };
    }
  } catch (err) {
    return { success: false, error: "Error komputasi DES: " + err.message };
  }
}

// 3. Playfair Cipher (Substitusi Digraf 5x5 Matrix)
export function processPlayfair(text, key, isEncrypt) {
  try {
    if (!text || !key) return { success: false, error: "Teks dan Kunci wajib diisi." };
    
    // Siapkan matriks 5x5 alfabet (I dan J digabung)
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I");
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const matrix = [];
    const used = new Set();

    for (const char of cleanKey + alphabet) {
      if (!used.has(char)) {
        used.add(char);
        matrix.push(char);
      }
    }

    const getPos = (char) => {
      const idx = matrix.indexOf(char === "J" ? "I" : char);
      return [Math.floor(idx / 5), idx % 5];
    };

    // Format teks input menjadi digraf
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I");
    if (!cleanText) return { success: false, error: "Teks harus mengandung alfabet A-Z." };

    let prepared = "";
    for (let i = 0; i < cleanText.length; i += 2) {
      const c1 = cleanText[i];
      const c2 = cleanText[i + 1];
      if (!c2) {
        prepared += c1 + "X";
      } else if (c1 === c2) {
        prepared += c1 + "X";
        i--;
      } else {
        prepared += c1 + c2;
      }
    }

    let result = "";
    const shift = isEncrypt ? 1 : 4; // modulo 5: -1 sama dengan +4

    for (let i = 0; i < prepared.length; i += 2) {
      const [r1, c1] = getPos(prepared[i]);
      const [r2, c2] = getPos(prepared[i + 1]);

      if (r1 === r2) {
        result += matrix[r1 * 5 + ((c1 + shift) % 5)];
        result += matrix[r2 * 5 + ((c2 + shift) % 5)];
      } else if (c1 === c2) {
        result += matrix[((r1 + shift) % 5) * 5 + c1];
        result += matrix[((r2 + shift) % 5) * 5 + c2];
      } else {
        result += matrix[r1 * 5 + c2];
        result += matrix[r2 * 5 + c1];
      }
    }

    return { success: true, result };
  } catch (err) {
    return { success: false, error: "Error Playfair: " + err.message };
  }
}
