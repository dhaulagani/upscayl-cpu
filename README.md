# 🆙 Upscayl CPU Edition

**Upscayl CPU Edition** adalah versi Upscayl yang dimodifikasi khusus agar dapat berjalan 100% pada **CPU laptop atau komputer tanpa kartu grafis (GPU terdedikasi)**.

Versi resmi Upscayl membutuhkan GPU yang kompatibel dengan Vulkan dan akan mengalami *crash* atau error `invalid gpu device` jika dijalankan pada laptop dengan grafis terintegrasi lama (Intel HD Graphics) atau mesin tanpa GPU. Versi ini mengatasi batasan tersebut menggunakan lapisan emulasi perangkat lunak (*software rasterization*).

---

## ⚡ Cara Kerja

Aplikasi ini menggunakan **Google SwiftShader** (Windows & macOS) dan **Mesa Lavapipe** (Linux) sebagai penerjemah Vulkan berbasis CPU. Seluruh komputasi neural network NCNN dan SPIR-V compute shader dieksekusi langsung oleh *core* prosesor CPU menggunakan instruksi vektor SIMD (AVX2/SSE/Neon) tanpa membutuhkan GPU fisik.

---

## 📦 Unduhan Cepat (Versi Portable Windows)

Tidak memerlukan instalasi atau runtime tambahan:

👉 **[Unduh Upscayl CPU Portable v2.15.0 (ZIP)](https://github.com/dhaulagani/upscayl-cpu/releases/latest)**

### Cara Menggunakan Versi Portable:
1. Unduh dan ekstrak file `Upscayl-CPU-v2.15.0-Windows-Portable.zip`.
2. Klik ganda **`Upscayl-CPU.bat`** (atau `Upscayl.exe`).
3. Pilih gambar yang ingin diperbesar (*Select Image*).
4. Pilih model AI (disarankan **Upscayl Lite** atau **General Photo**).
5. Klik **UPSCAYL** — proses perbesaran gambar langsung ditangani oleh CPU laptop Anda!

---

## 🛠️ Menjalankan dari Source Code (Developer)

Bagi yang ingin menjalankan langsung dari repository:

```bash
# 1. Clone repository
git clone https://github.com/dhaulagani/upscayl-cpu.git
cd upscayl-cpu

# 2. Install dependencies
npm install

# 3. Setup runtime CPU otomatis
npm run setup:cpu

# 4. Jalankan aplikasi
npm run dev
```

Di dalam aplikasi, buka **Settings (⚙️)** lalu pastikan toggle **CPU Mode (No GPU)** dalam posisi **ON**.

---

## 💡 Tips Optimalisasi Penggunaan di CPU

Karena komputasi AI pada CPU membutuhkan daya kalkulasi tinggi:
1. **Pilih Model Ringan**: Model `Upscayl Lite` dirancang khusus untuk menghasilkan peningkatan resolusi berkualitas tinggi dengan beban komputasi CPU yang jauh lebih hemat.
2. **Atur Tile Size**: Pada menu Pengaturan (*Settings*), atur *Custom Tile Size* ke nilai `32` atau `64` untuk memaksimalkan efisiensi *cache* L2/L3 prosesor.
3. **Resolusi Output**: Skala 2x atau 4x standar memberikan rasio kecepatan dan ketajaman gambar terbaik.

---

## 📄 Lisensi & Kredit

- Proyek dasar: [Upscayl](https://github.com/upscayl/upscayl) (GPL-3.0).
- Backend komputasi: NCNN & Real-ESRGAN.
- CPU Software Rasterizer: Google SwiftShader & Mesa Lavapipe.
