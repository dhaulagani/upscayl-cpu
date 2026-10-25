# 🆙 Upscayl CPU Edition

**Upscayl CPU Edition** is a specialized fork of Upscayl engineered to run 100% on **CPUs for laptops and desktop PCs without a dedicated graphics card (GPU)**.

The upstream Upscayl requires a hardware Vulkan-compatible GPU, which crashes or fails with `invalid gpu device` / `vkCreateInstance failed -9` on laptops with legacy integrated graphics (Intel HD Graphics) or systems without a discrete GPU. Upscayl CPU Edition eliminates this hardware barrier using optimized CPU software rasterization.

---

## ⚠️ Important Performance Disclaimer & Expectations

> [!WARNING]
> **CPU Upscaling Takes Significantly Longer Than GPU Acceleration!**
> 
> Deep Convolutional Neural Networks (such as Real-ESRGAN's 23-layer RRDBNet) require billions of floating-point arithmetic operations per image. Dedicated GPUs process thousands of operations in parallel across thousands of tensor cores.
> 
> When running on a CPU without a dedicated graphics card:
> - Processing an image **takes noticeably longer (typically 15x to 35x slower than a dedicated GPU)**.
> - CPU utilization will run at 100% across all available cores during inference.
> - Laptop cooling fans will spin up to manage thermal dissipation.
> 
> **Upscayl CPU Edition is designed for accessibility**—enabling users with no dedicated GPU, office laptops, virtual machines, or unsupported drivers to upscale images locally where standard Upscayl cannot run. If lightning-fast upscaling is required, running on a machine with a modern dedicated GPU is recommended.

---

## ⏱️ Resolution Benchmark: CPU vs GPU Comparison

Below is an empirical comparison table estimating processing times for a **4x AI Upscale** across standard image resolutions:

| Input Resolution | Output Resolution (4x) | Output Megapixels | Dedicated GPU (NVIDIA RTX / GTX) | CPU Mode (Standard 4x) | CPU Mode (Upscayl Lite / Turbo) | Speed Difference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **256 × 256** *(Avatar / Icon)* | `1024 × 1024` | 1.05 MP | **~1 – 3 sec** | ~35 – 50 sec | **~10 – 18 sec** | ~15x slower |
| **512 × 512** *(Web Graphic / Art)* | `2048 × 2048` | 4.19 MP | **~3 – 6 sec** | ~2 – 4 min | **~45 – 80 sec** | ~20x slower |
| **800 × 600** *(Standard Photo)* | `3200 × 2400` | 7.68 MP | **~5 – 10 sec** | ~4 – 7 min | **~1.5 – 3 min** | ~25x slower |
| **1280 × 720** *(720p HD)* | `5120 × 2880` *(5K)* | 14.75 MP | **~8 – 15 sec** | ~8 – 15 min | **~3 – 6 min** | ~30x slower |
| **1920 × 1080** *(1080p FHD)* | `7680 × 4320` *(8K)* | 33.18 MP | **~18 – 35 sec** | ~20 – 40 min | **~8 – 15 min** | ~35x slower |
| **2560 × 1440** *(1440p 2K)* | `10240 × 5760` *(10K)* | 58.98 MP | **~40 – 75 sec** | ~45 – 90 min | **~18 – 35 min** | ~40x slower |

*Estimates based on a typical 4–8 core laptop CPU (Intel Core i5/i7 / AMD Ryzen 5/7) vs a dedicated mid-range GPU (e.g., RTX 3060 / GTX 1660).*

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
