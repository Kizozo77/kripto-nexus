// Utility Extended Euclidean Algorithm
function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function powerMod(base, exp, mod) {
  let res = 1n;
  base = BigInt(base) % BigInt(mod);
  exp = BigInt(exp);
  const m = BigInt(mod);

  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % m;
    base = (base * base) % m;
    exp /= 2n;
  }
  return Number(res);
}

// 1. Hill Cipher Modulo 128 (Mendukung Seluruh Karakter ASCII 0-127)
export function processHill(text, matrixStr, isEncrypt) {
  try {
    if (!text || !matrixStr) return { success: false, error: "Teks dan Matriks 2x2 wajib diisi." };

    const parts = matrixStr.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) {
      return { success: false, error: "Matriks harus terdiri dari 4 angka (contoh: 3 5 1 2)." };
    }

    const [a, b, c, d] = parts;
    const MOD = 128;

    // Hitung determinan mod 128
    let det = (a * d - b * c) % MOD;
    if (det < 0) det += MOD;

    if (det % 2 === 0 || gcd(det, MOD) !== 1) {
      return {
        success: false,
        error: `Determinan (${det}) bernilai genap. Wajib ganjil agar memiliki invers modular di Modulo 128. Gunakan contoh: 3 5 1 2`,
      };
    }

    const detInv = modInverse(det, MOD);
    if (!detInv) return { success: false, error: "Matriks tidak memiliki invers modulo 128." };

    // Matriks invers
    const invA = (d * detInv) % MOD;
    const invB = (((-b % MOD) + MOD) * detInv) % MOD;
    const invC = (((-c % MOD) + MOD) * detInv) % MOD;
    const invD = (a * detInv) % MOD;

    const [kA, kB, kC, kD] = isEncrypt ? [a, b, c, d] : [invA, invB, invC, invD];

    // Ganjilkan teks dengan spasi jika perlu
    let padded = text;
    if (padded.length % 2 !== 0) padded += " ";

    let result = "";
    for (let i = 0; i < padded.length; i += 2) {
      const p1 = padded.charCodeAt(i) % MOD;
      const p2 = padded.charCodeAt(i + 1) % MOD;

      const c1 = (kA * p1 + kB * p2) % MOD;
      const c2 = (kC * p1 + kD * p2) % MOD;

      result += String.fromCharCode(c1) + String.fromCharCode(c2);
    }

    return {
      success: true,
      result,
      details: {
        modulo: 128,
        determinant: det,
        matrixUsed: isEncrypt ? `[${a} ${b}; ${c} ${d}]` : `[${invA} ${invB}; ${invC} ${invD}]`,
      },
    };
  } catch (err) {
    return { success: false, error: "Error Hill Cipher: " + err.message };
  }
}

// 2. Toy RSA (Asimetris Publik & Privat)
export function processToyRSA(p, q, e, msg) {
  try {
    p = parseInt(p);
    q = parseInt(q);
    e = parseInt(e);
    msg = parseInt(msg);

    if (!p || !q || !e || isNaN(msg)) {
      return { success: false, error: "Parameter prima p, q, eksponen e, dan pesan m wajib diisi." };
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      return { success: false, error: `Nilai e (${e}) harus koprima terhadap phi (${phi}).` };
    }

    if (msg >= n) {
      return { success: false, error: `Pesan angka m (${msg}) harus lebih kecil dari modulus n (${n}).` };
    }

    const d = modInverse(e, phi);
    if (!d) return { success: false, error: "Kunci privat d tidak dapat ditemukan." };

    const cipher = powerMod(msg, e, n);
    const decrypted = powerMod(cipher, d, n);

    return {
      success: true,
      result: `Ciphertext: ${cipher} | Dekripsi: ${decrypted}`,
      details: {
        n,
        phi,
        publicKey: `(e=${e}, n=${n})`,
        privateKey: `(d=${d}, n=${n})`,
      },
    };
  } catch (err) {
    return { success: false, error: "Error RSA: " + err.message };
  }
}

// 3. Diffie-Hellman Key Exchange
export function processDiffieHellman(p, g, a, b) {
  try {
    p = parseInt(p);
    g = parseInt(g);
    a = parseInt(a);
    b = parseInt(b);

    if (!p || !g || !a || !b) {
      return { success: false, error: "Semua parameter p, g, private a, dan private b wajib diisi." };
    }

    const pubA = powerMod(g, a, p);
    const pubB = powerMod(g, b, p);

    const secretA = powerMod(pubB, a, p);
    const secretB = powerMod(pubA, b, p);

    return {
      success: true,
      result: `Shared Secret Key: ${secretA}`,
      details: {
        pubA,
        pubB,
        sharedSecret: secretA,
        matched: secretA === secretB,
      },
    };
  } catch (err) {
    return { success: false, error: "Error Diffie-Hellman: " + err.message };
  }
}
