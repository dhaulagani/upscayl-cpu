import { spawn } from "child_process";
import { execPath, binariesPath } from "./get-resource-paths";
import { getPlatform } from "./get-device-specs";
import { join } from "path";
import os from "os";

export interface SpawnUpscaylOptions {
  cpuMode?: boolean;
}

export const spawnUpscayl = (
  command: string[],
  logit: (...args: any) => void,
  options?: SpawnUpscaylOptions,
) => {
  const isCpu = options?.cpuMode ?? false;
  logit(
    `📢 Upscayl Command (${isCpu ? "Turbo CPU Mode" : "GPU Mode"}): `,
    command.filter((arg) => arg !== ""),
  );

  const env: NodeJS.ProcessEnv = { ...process.env };
  if (isCpu) {
    const cpuCores = os.cpus().length;
    // Multi-core thread affinity and instruction scheduling for SwiftShader
    env["OMP_NUM_THREADS"] = Math.max(1, cpuCores - 1).toString();
    env["OMP_PROC_BIND"] = "spread";
    env["OMP_WAIT_POLICY"] = "active";
    env["SWIFTSHADER_DISABLE_DEBUG"] = "1";

    if (getPlatform() === "win") {
      env["VK_ICD_FILENAMES"] = join(binariesPath, "vk_swiftshader_icd.json");
      env["VK_DRIVER_FILES"] = join(binariesPath, "vk_swiftshader_icd.json");
    } else if (getPlatform() === "linux") {
      env["VK_DRIVER_FILES"] = "/usr/share/vulkan/icd.d/lvp_icd.x86_64.json";
      env["GALLIUM_DRIVER"] = "llvmpipe";
      env["LIBGL_ALWAYS_SOFTWARE"] = "1";
    }
  }

  const spawnedProcess = spawn(
    execPath,
    command.filter((arg) => arg !== ""),
    {
      cwd: binariesPath,
      env,
      detached: false,
    },
  );

  return {
    process: spawnedProcess,
    kill: () => spawnedProcess.kill(),
  };
};
