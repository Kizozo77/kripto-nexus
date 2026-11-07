# 🔐 KRIPTO-NEXUS • Interactive Cryptography Suite

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](https://kriptonexus.vercel.app/)
[![License: Academic](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)](LICENSE)

**Platform Web Eksplorasi & Simulasi 4 Kategori serta 12 Algoritma Kriptografi Interaktif.**

[🌐 Kunjungi Aplikasi Live](https://kriptonexus.vercel.app/) • [📦 Repositori GitHub](https://github.com/Kizozo77/kripto-nexus)

</div>

---

## 👥 Susunan Tim Pengembang (Kelompok 3)

| No | Nama Anggota | NIM | Peran Tim | Fokus Tanggung Jawab |
| :---: | :--- | :---: | :--- | :--- |
| 1 | **Muhammad Rizki Aulia** | 240170096 | Lead Coordinator & UI/UX Architect | Project Architecture, UI/UX Design & Deployment |
| 2 | **Ivanly Juan Felix Limbong** | 240170189 | Block Cipher Specialist | Algoritma AES, DES/3DES & Playfair Cipher |
| 3 | **Rofli** | 240170112 | Stream Cipher Engineer | Algoritma RC4, One-Time Pad (OTP) & Autokey Cipher |
| 4 | **Muhammad Fadhil Hasibuan** | 240170215 | Security Function Specialist | Caesar Cipher, SHA-256 Digest & HMAC Integrity |
| 5 | **Muhammad Al Idrisi** | 240170178 | Mathematical Cryptography Specialist | Hill Cipher Mod 128, Toy RSA & Diffie-Hellman |

---

## 🧩 Ringkasan Fitur & 12 Algoritma

Aplikasi ini menyajikan 4 pilar kategori kriptografi interaktif yang diproses secara langsung di sisi peramban (*client-side*):

### 1. Block Cipher Engine
* **AES (Advanced Encryption Standard):** Pemrosesan blok data 128-bit melalui tahapan SubBytes, ShiftRows, MixColumns, dan AddRoundKey.
* **DES (Data Encryption Standard):** Pemrosesan blok 64-bit menggunakan struktur Feistel 16 putaran silang.
* **Playfair Cipher:** Substitusi digraf (pasangan 2 huruf) menggunakan matriks kunci 5x5.

### 2. Stream Cipher Engine
* **RC4 (Rivest Cipher 4):** Pembangkitan aliran kunci semu acak berbasis KSA (*Key-Scheduling Algorithm*) dan PRGA (*Pseudo-Random Generation Algorithm*).
* **One-Time Pad (OTP):** Operasi bitwise XOR dengan syarat kunci acak sepanjang pesan (*perfect secrecy*).
* **Autokey Cipher:** Perluasan kunci otomatis berbasis sambungan teks asli (*plaintext keystream*).

### 3. Fungsi Utama Kriptografi (CIA Triad)
* **Kerahasiaan (*Confidentiality*):** Caesar Cipher berbasis pergeseran alfabet modular.
* **Integritas (*Integrity*):** SHA-256 Hash Digest menghasilkan sidik jari 64 digit heksadesimal dengan demonstrasi efek longsoran (*avalanche effect*).
* **Otentikasi (*Authenticity*):** HMAC SHA-256 berbasis RFC 2104 menggunakan shared secret key.

### 4. Dasar Matematika Kriptografi (Modulo 128 ASCII)
* **Hill Cipher Modulo 128:** Perkalian matriks 2x2 terhadap seluruh 128 karakter tabel ASCII standar (termasuk spasi dan simbol).
* **Toy RSA:** Kriptografi asimetris berbasis faktorisasi prima, modulus n, totien Euler, serta pasangan kunci publik & privat.
* **Diffie-Hellman Key Exchange:** Simulasi pertukaran dan pembentukan kunci rahasia bersama (*shared secret key*) melalui kanal terbuka menggunakan logaritma diskret.

---

## 🛠️ Stack Teknologi

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4 & Lucide React
* **Hosting:** Vercel (CI/CD terintegrasi dengan GitHub)

---

## 🚀 Menjalankan Proyek Secara Lokal

```bash
# 1. Clone repositori
git clone [https://github.com/Kizozo77/kripto-nexus.git](https://github.com/Kizozo77/kripto-nexus.git)

# 2. Masuk ke direktori
cd kripto-nexus

# 3. Pasang dependensi
npm install

# 4. Jalankan development server
npm run dev