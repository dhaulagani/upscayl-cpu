import getModelScale from "../../common/check-model-scale";
import { getPlatform } from "./get-device-specs";
import { ImageFormat } from "../types/types";
const slash: string = getPlatform() === "win" ? "\\" : "/";

export const getSingleImageArguments = ({
  inputDir,
  fileNameWithExt,
  outFile,
  modelsPath,
  model,
  scale,
  gpuId,
  saveImageAs,
  customWidth,
  tileSize,
  compression,
  ttaMode,
  cpuMode,
}: {
  inputDir: string;
  fileNameWithExt: string;
  outFile: string;
  modelsPath: string;
  model: string;
  scale: string;
  gpuId: string;
  saveImageAs: ImageFormat;
  customWidth: string;
  tileSize: number;
  compression: string;
  ttaMode: boolean;
  cpuMode?: boolean;
}) => {
  const modelScale = getModelScale(model);
  let includeScale = modelScale !== scale && !customWidth;
  const effectiveGpuId = cpuMode ? "0" : (gpuId || "");
  const effectiveTileSize = tileSize
    ? tileSize.toString()
    : cpuMode
    ? "32"
    : "";

  return [
    // INPUT IMAGE
    "-i",
    inputDir + slash + fileNameWithExt,
    // OUTPUT IMAGE
    "-o",
    outFile,
    // OUTPUT SCALE
    includeScale ? "-s" : "",
    includeScale ? scale : "",
    // MODELS PATH
    "-m",
    modelsPath,
    // MODEL NAME
    "-n",
    model,
    // GPU ID
    effectiveGpuId ? "-g" : "",
    effectiveGpuId ? effectiveGpuId : "",
    // FORMAT
    "-f",
    saveImageAs,
    // CUSTOM WIDTH
    customWidth ? `-w` : "",
    customWidth ? customWidth : "",
    // COMPRESSION
    "-c",
    compression,
    // TILE SIZE
    effectiveTileSize ? `-t` : "",
    effectiveTileSize ? effectiveTileSize : "",
    // TTA MODE
    ttaMode ? "-x" : "",
  ];
};

export const getDoubleUpscaleArguments = ({
  inputDir,
  fullfileName,
  outFile,
  modelsPath,
  scale,
  model,
  gpuId,
  saveImageAs,
  customWidth,
  tileSize,
  cpuMode,
}: {
  inputDir: string;
  fullfileName: string;
  outFile: string;
  modelsPath: string;
  scale: string;
  model: string;
  gpuId: string;
  saveImageAs: ImageFormat;
  customWidth: string;
  tileSize: number;
  cpuMode?: boolean;
}) => {
  const modelScale = getModelScale(model);
  let includeScale = modelScale !== scale && !customWidth;
  const effectiveGpuId = cpuMode ? "0" : (gpuId || "");
  const effectiveTileSize = tileSize
    ? tileSize.toString()
    : cpuMode
    ? "32"
    : "";

  return [
    // INPUT IMAGE
    "-i",
    inputDir + slash + fullfileName,
    // OUTPUT IMAGE
    "-o",
    outFile,
    // OUTPUT SCALE
    includeScale ? "-s" : "",
    includeScale ? scale : "",
    // MODELS PATH
    "-m",
    modelsPath,
    // MODEL NAME
    "-n",
    model,
    // GPU ID
    effectiveGpuId ? `-g` : "",
    effectiveGpuId ? effectiveGpuId : "",
    // FORMAT
    "-f",
    saveImageAs,
    // TILE SIZE
    effectiveTileSize ? `-t` : "",
    effectiveTileSize ? effectiveTileSize : "",
  ];
};

export const getDoubleUpscaleSecondPassArguments = ({
  outFile,
  modelsPath,
  model,
  gpuId,
  saveImageAs,
  scale,
  customWidth,
  compression,
  tileSize,
  ttaMode,
  cpuMode,
}: {
  outFile: string;
  modelsPath: string;
  model: string;
  gpuId: string;
  saveImageAs: ImageFormat;
  scale: string;
  customWidth: string;
  compression: string;
  tileSize: number;
  ttaMode: boolean;
  cpuMode?: boolean;
}) => {
  const modelScale = getModelScale(model);
  let includeScale = modelScale !== scale && !customWidth;
  const effectiveGpuId = cpuMode ? "0" : (gpuId || "");
  const effectiveTileSize = tileSize
    ? tileSize.toString()
    : cpuMode
    ? "32"
    : "";

  return [
    // INPUT IMAGE
    "-i",
    outFile,
    // OUTPUT IMAGE
    "-o",
    outFile,
    // OUTPUT SCALE
    includeScale ? "-s" : "",
    includeScale ? scale : "",
    // MODELS PATH
    "-m",
    modelsPath,
    // MODEL NAME
    "-n",
    model,
    // GPU ID
    effectiveGpuId ? `-g` : "",
    effectiveGpuId ? effectiveGpuId : "",
    // FORMAT
    "-f",
    saveImageAs,
    // CUSTOM WIDTH
    customWidth ? `-w` : "",
    customWidth ? customWidth : "",
    // COMPRESSION
    "-c",
    compression,
    // TILE SIZE
    effectiveTileSize ? `-t` : "",
    effectiveTileSize ? effectiveTileSize : "",
    // TTA MODE
    ttaMode ? "-x" : "",
  ];
};

export const getBatchArguments = ({
  inputDir,
  outputDir,
  modelsPath,
  model,
  gpuId,
  saveImageAs,
  scale,
  customWidth,
  compression,
  tileSize,
  ttaMode,
  cpuMode,
}: {
  inputDir: string;
  outputDir: string;
  modelsPath: string;
  model: string;
  gpuId: string;
  saveImageAs: ImageFormat;
  scale: string;
  customWidth: string;
  compression: string;
  tileSize: number;
  ttaMode: boolean;
  cpuMode?: boolean;
}) => {
  const modelScale = getModelScale(model);
  let includeScale = modelScale !== scale && !customWidth;
  const effectiveGpuId = cpuMode ? "0" : (gpuId || "");
  const effectiveTileSize = tileSize
    ? tileSize.toString()
    : cpuMode
    ? "32"
    : "";

  return [
    // INPUT IMAGE
    "-i",
    inputDir,
    // OUTPUT IMAGE
    "-o",
    outputDir,
    // OUTPUT SCALE
    includeScale ? "-s" : "",
    includeScale ? scale : "",
    // MODELS PATH
    "-m",
    modelsPath,
    // MODEL NAME
    "-n",
    model,
    // GPU ID
    effectiveGpuId ? `-g` : "",
    effectiveGpuId ? effectiveGpuId : "",
    // FORMAT
    "-f",
    saveImageAs,
    // CUSTOM WIDTH
    customWidth ? `-w` : "",
    customWidth ? customWidth : "",
    // COMPRESSION
    "-c",
    compression,
    // TILE SIZE
    effectiveTileSize ? `-t` : "",
    effectiveTileSize ? effectiveTileSize : "",
    // TTA MODE
    ttaMode ? "-x" : "",
  ];
};
