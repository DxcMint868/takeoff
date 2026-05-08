"use client";

import { useTranslation } from "../lib/i18n/use-translation";

type ContentLoadingOverlayProps = {
  visible: boolean;
  /** When false, overlay only covers the nearest `relative` ancestor */
  fullViewport?: boolean;
};

/**
 * Shared full-area loading: dim backdrop + default circular spinner + “Loading”.
 */
export function ContentLoadingOverlay({
  visible,
  fullViewport = true,
}: ContentLoadingOverlayProps) {
  const { t } = useTranslation();
  if (!visible) return null;

  const positionClass = fullViewport ? "fixed inset-0" : "absolute inset-0";

  return (
    <div
      className={`${positionClass} z-[90] flex items-center justify-center bg-[#0d0824]/70 backdrop-blur-[3px] motion-reduce:bg-[#0d0824]/85 motion-reduce:backdrop-blur-none`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t("common.loading")}
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div
          className="size-10 shrink-0 animate-spin rounded-full border-2 border-solid border-white/20 border-t-purple motion-reduce:animate-none"
          aria-hidden
        />
        <p className="m-0 font-reg text-sm text-white-60">{t("common.loading")}</p>
      </div>
    </div>
  );
}
