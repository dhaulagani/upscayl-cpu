import { cpuModeAtom } from "@/atoms/user-settings-atom";
import { translationAtom } from "@/atoms/translations-atom";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { Cpu } from "lucide-react";

export function CpuModeToggle() {
  const [cpuMode, setCpuMode] = useAtom(cpuModeAtom);
  const t = useAtomValue(translationAtom);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">
            {t("SETTINGS.CPU_MODE.TITLE")}
          </p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-sm"
          checked={cpuMode}
          onChange={(e) => setCpuMode(e.target.checked)}
        />
      </div>
      <p className="text-xs text-base-content/80">
        {t("SETTINGS.CPU_MODE.DESCRIPTION")}
      </p>
      {cpuMode && (
        <span className="badge badge-warning badge-sm">
          {t("SETTINGS.CPU_MODE.BADGE")}
        </span>
      )}
    </div>
  );
}

export default CpuModeToggle;
