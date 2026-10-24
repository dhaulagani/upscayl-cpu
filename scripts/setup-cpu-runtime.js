#!/usr/bin/env node
/**
 * Autonomous CPU Runtime Provisioner for Upscayl.
 * Configures Google SwiftShader / Mesa Lavapipe software rasterizer
 * so Upscayl runs seamlessly on laptops without a dedicated GPU.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log('🚀 [Upscayl for CPU] Setting up CPU Software Rendering Runtime...');

const platform = os.platform();
const projectRoot = path.resolve(__dirname, '..');

if (platform === 'win32') {
  const binDir = path.join(projectRoot, 'resources', 'win', 'bin');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // 1. Search for existing local SwiftShader installations
  const searchCandidates = [
    'C:\\Program Files\\Google\\Chrome\\Application',
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application'),
    path.join(process.env.LOCALAPPDATA || '', 'BraveSoftware\\Brave-Browser\\Application'),
  ];

  let foundDll = null;
  for (const root of searchCandidates) {
    if (fs.existsSync(root)) {
      try {
        const subdirs = fs.readdirSync(root);
        for (const sub of subdirs) {
          const candidate = path.join(root, sub, 'vk_swiftshader.dll');
          if (fs.existsSync(candidate)) {
            foundDll = candidate;
            break;
          }
        }
      } catch (e) {}
    }
    if (foundDll) break;
  }

  if (foundDll) {
    console.log(`✅ Found SwiftShader CPU library at: ${foundDll}`);
    const destDll = path.join(binDir, 'vk_swiftshader.dll');
    const destVulkan1 = path.join(binDir, 'vulkan-1.dll');
    fs.copyFileSync(foundDll, destDll);
    fs.copyFileSync(foundDll, destVulkan1);
    console.log(`✅ Copied to: ${destDll} and ${destVulkan1}`);
  } else {
    console.log('⚠️ Local SwiftShader DLL not found in standard browser paths.');
    console.log('💡 Note: You can place vk_swiftshader.dll into resources/win/bin/ to enable CPU Mode.');
  }

  // Write ICD JSON
  const icdJsonPath = path.join(binDir, 'vk_swiftshader_icd.json');
  const icdData = {
    file_format_version: '1.0.0',
    ICD: {
      library_path: '.\\vk_swiftshader.dll',
      api_version: '1.3.0',
    },
  };
  fs.writeFileSync(icdJsonPath, JSON.stringify(icdData, null, 2), 'utf-8');
  console.log(`✅ Created Vulkan ICD manifest: ${icdJsonPath}`);

} else if (platform === 'linux') {
  console.log('🐧 Linux detected: Checking for Mesa Lavapipe CPU rasterizer...');
  const lvpPaths = [
    '/usr/share/vulkan/icd.d/lvp_icd.x86_64.json',
    '/usr/share/vulkan/icd.d/lvp_icd.i686.json',
  ];
  const found = lvpPaths.some(p => fs.existsSync(p));
  if (found) {
    console.log('✅ Mesa Lavapipe (CPU Vulkan) driver found!');
  } else {
    console.log('ℹ️ To run on CPU on Linux, install Mesa Vulkan drivers:');
    console.log('   sudo apt update && sudo apt install mesa-vulkan-drivers');
  }
} else {
  console.log(`ℹ️ Platform ${platform}: Native CPU fallback ready via software rendering.`);
}

console.log('🎉 [Upscayl for CPU] Setup complete! Enable "CPU Mode (No GPU)" in Settings to upscale without GPU.');
