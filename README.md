<div align="center">

# 🛡️ KRIPTO-NEXUS
### Interactive Cryptography & Modern Security Suite

[![Deployment Status](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://kriptonexus.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Academic-Project%20Kelompok%203-blue?style=for-the-badge)](https://github.com/Kizozo77/kripto-nexus)

<p align="center">
  Platform simulasi dan analisis komputasi kriptografi modern yang mencakup 4 kategori utama dan 12 algoritma interaktif secara real-time di sisi peramban (client-side).
</p>

[**🌐 Kunjungi Aplikasi Live**](https://kriptonexus.vercel.app/) • [**Report Bug**](https://github.com/Kizozo77/kripto-nexus/issues)

---

</div>

## 📌 Ringkasan Proyek

**KRIPTO-NEXUS** dirancang sebagai media edukasi dan eksplorasi komputasi kriptografi interaktif. Aplikasi ini dibangun dengan antarmuka **Clean SaaS modern** (putih cerah, responsif multi-device, dan didukung *frosted glassmorphism*). Pengguna dapat menguji proses enkripsi, dekripsi, pembentukan hash digest, hingga pertukaran kunci matematika secara langsung tanpa perlu instalasi tools khusus.

---

## 👥 Susunan Tim Pengembang (Kelompok 3)

| No | Foto / Inisial | Nama Lengkap | NIM | Peran Tim | Fokus Implementasi |
|:--:|:---:|:---|:---:|:---|:---|
| 1 | 👑 | **Muhammad Rizki Aulia** | `240170096` | **Lead Coordinator & UI/UX Architect** | Project Architecture, UI/UX SaaS System & Deployment |
| 2 | 🛡️ | **Ivanly Juan Felix Limbong** | `240170189` | **Block Cipher Specialist** | Algoritma AES, DES (Feistel) & Playfair Cipher |
| 3 | ⚡ | **Rofli** | `240170112` | **Stream Cipher Engineer** | Algoritma RC4 (KSA & PRGA), One-Time Pad & Autokey |
| 4 | 🔑 | **Muhammad Fadhil Hasibuan** | `240170215` | **Security Function Specialist** | Caesar Cipher, SHA-256 Digest & Otentikasi HMAC |
| 5 | 🧮 | **Muhammad Al Idrisi** | `240170178` | **Mathematical Cryptography Specialist** | Hill Cipher Modulo 128 ASCII, Toy RSA & Diffie-Hellman |

---

## 🚀 Cakupan Modul & 12 Algoritma

```
KRIPTO-NEXUS
├── 1. Block Cipher Engine
│   ├── AES (Advanced Encryption Standard - 128 bit)
│   ├── DES (Data Encryption Standard - 16 Putaran Feistel)
│   └── Playfair Cipher (Matriks Digraf 5x5)
├── 2. Stream Cipher Engine
│   ├── RC4 (Permutasi S-Box KSA & Keystream PRGA)
│   ├── One-Time Pad / OTP (Perfect Secrecy via Bitwise XOR)
│   └── Autokey Cipher (Aliran Kunci Menyambung Modulo 128)
├── 3. Fungsi Utama Kriptografi (CIA Triad)
│   ├── Kerahasiaan (Caesar Cipher Modulo 26)
│   ├── Integritas Data (SHA-256 Digest & Avalanche Effect)
│   └── Otentikasi Pengirim (HMAC-SHA256 via Shared Key)
└── 4. Algoritma Dasar Matematika (Modulo 128 ASCII)
    ├── Aljabar Linear (Hill Cipher Modulo 128 Full ASCII)
    ├── Faktorisasi Prima (Toy RSA: Public & Private Keypair)
    └── Logaritma Diskret (Diffie-Hellman Key Exchange)
```

---

## 🛠️ Stack Teknologi

- **Core Framework:** [Next.js](https://nextjs.org/) (App Router Architecture)
- **Library UI:** [React](https://react.dev/) 
- **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) dengan tema Clean SaaS
- **Ikonografi:** [Lucide React](https://lucide.dev/)
- **Branding & Favicon:** Image Response API (`next/og`) menghasilkan Monogram "K" Obsidian Black
- **Hosting & CI/CD:** [Vercel](https://vercel.com/) terintegrasi otomatis dengan GitHub Repository

---

## 💻 Panduan Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js** (versi 18.x atau lebih baru) dan package manager **npm**.

### 1. Kloning Repositori
```bash
git clone https://github.com/Kizozo77/kripto-nexus.git
cd kripto-nexus
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Development Mode)
```bash
npm run dev
```
Buka peramban Anda dan akses URL: `http://localhost:3000`

### 4. Build untuk Lingkungan Produksi
```bash
npm run build
npm run start
```

---

## 📄 Lisensi & Hak Cipta

Proyek ini dikembangkan guna memenuhi tugas akademik mata kuliah **Kriptografi & Steganografi** oleh **Kelompok 3**. Seluruh kode sumber terbuka untuk keperluan pembelajaran dan pengembangan akademis.
