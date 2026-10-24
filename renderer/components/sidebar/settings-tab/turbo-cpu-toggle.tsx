import { turboCpuModeAtom, cpuModeAtom } from "@/atoms/user-settings-atom";
import { translationAtom } from "@/atoms/translations-atom";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { Zap } from "lucide-react";

export function TurboCpuToggle() {
  const [turboCpuMode, setTurboCpuMode] = useAtom(turboCpuModeAtom);
  const cpuMode = useAtomValue(cpuModeAtom);
  const t = useAtomValue(translationAtom);

  if (!cpuMode) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-warning" />
          <p className="text-sm font-medium">
            {t("SETTINGS.TURBO_CPU.TITLE")}
          </p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-warning toggle-sm"
          checked={turboCpuMode}
          onChange={(e) => setTurboCpuMode(e.target.checked)}
        />
      </div>
      <p className="text-xs text-base-content/80">
        {t("SETTINGS.TURBO_CPU.DESCRIPTION")}
      </p>
    </div>
  );
}

export default TurboCpuToggle;
