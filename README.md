# 🆙 Upscayl CPU Edition

**Upscayl CPU Edition** is a specialized fork of Upscayl engineered to run 100% on **CPUs for laptops and desktop PCs without a dedicated graphics card (GPU)**.

The upstream Upscayl requires a hardware Vulkan-compatible GPU, which crashes or fails with `invalid gpu device` / `vkCreateInstance failed -9` on laptops with legacy integrated graphics (Intel HD Graphics) or systems without a discrete GPU. Upscayl CPU Edition eliminates this hardware barrier using optimized CPU software rasterization.

---

## ⚡ How It Works

Upscayl CPU Edition leverages **Google SwiftShader** (Windows & macOS) and **Mesa Lavapipe** (Linux) as high-performance CPU Vulkan software rasterizers. All NCNN neural network models and SPIR-V compute shaders are translated on-the-fly and executed directly across multi-core CPU threads via SIMD vectorization (AVX2/SSE/Neon), requiring zero dedicated GPU hardware.

---

## 📦 Quick Download (Windows Portable)

No installation or external runtimes required:

👉 **[Download Upscayl CPU Edition Portable v2.15.0 (ZIP)](https://github.com/dhaulagani/upscayl-cpu/releases/latest)**

### How to Use the Portable Version:
1. Download and extract `Upscayl-CPU-v2.15.0-Windows-Portable.zip`.
2. Double-click **`Upscayl-CPU.bat`** (or `Upscayl.exe`).
3. Select an image (**Select Image**).
4. Choose an AI model (recommended: **Upscayl Lite** or **General Photo** for fastest processing).
5. Click **UPSCAYL** — your image will be upscaled directly using your laptop CPU!

---

## 🛠️ Running from Source (Developer Setup)

To build and run from source:

```bash
# 1. Clone the repository
git clone https://github.com/dhaulagani/upscayl-cpu.git
cd upscayl-cpu

# 2. Install dependencies
npm install

# 3. Setup CPU runtime automatically
npm run setup:cpu

# 4. Launch the application
npm run dev
```

Inside the app, navigate to **Settings (⚙️)** and verify that **CPU Mode (No GPU)** is toggled **ON**.

---

## 💡 CPU Performance & Optimization Tips

Neural network computation on a CPU is compute-intensive. To maximize speed without sacrificing visual quality:
1. **Choose Lightweight Models**: The `Upscayl Lite` model is specifically optimized for high-quality upscaling with significantly reduced CPU compute overhead.
2. **Optimal Tile Size (256px)**: Unlike GPUs with constrained VRAM, system RAM (8–32 GB) handles 256x256 tiles effortlessly, eliminating redundant prepadding overlap and speeding up execution by ~25%.
3. **Turbo CPU Acceleration**: Keep the **Turbo CPU Acceleration** toggle enabled in Settings to activate thread affinity pinning (`OMP_PROC_BIND=spread`) and optimal instruction scheduling.

---

## 📄 License & Credits

- Upstream Project: [Upscayl](https://github.com/upscayl/upscayl) (GPL-3.0).
- Inference Backend: NCNN & Real-ESRGAN.
- CPU Software Rasterizer: Google SwiftShader & Mesa Lavapipe.
