import React from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";

export default function InstallPWABtn() {
  const { isSupported, isInstalled, install } = usePWAInstall();

  if (!isSupported || isInstalled) return null;

  return (
    <button
      onClick={install}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Install App
    </button>
  );
}
