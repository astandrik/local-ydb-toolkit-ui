"use client";

import { Copy, CopyCheck } from "@gravity-ui/icons";
import { useEffect, useRef, useState } from "react";

import "./CopyableCode.scss";

type CopyStatus = "idle" | "copied" | "failed";

type CopyableCodeProps = {
  value: string;
  className?: string;
  label?: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("Copy command failed");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

function getButtonTitle(status: CopyStatus, label: string) {
  if (status === "copied") {
    return "Copied";
  }

  if (status === "failed") {
    return "Copy failed";
  }

  return label;
}

export function CopyableCode({
  value,
  className,
  label = "Copy command",
}: CopyableCodeProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);
  const Icon = status === "copied" ? CopyCheck : Copy;
  const title = getButtonTitle(status, label);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }

    try {
      await copyText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    resetTimer.current = window.setTimeout(() => setStatus("idle"), 1800);
  }

  return (
    <div className={["copyable-code", className].filter(Boolean).join(" ")}>
      <pre>
        <code>{value}</code>
      </pre>
      <button
        type="button"
        className="copyable-code__button"
        aria-label={title}
        title={title}
        data-status={status}
        onClick={handleCopy}
      >
        <Icon aria-hidden="true" />
      </button>
    </div>
  );
}
