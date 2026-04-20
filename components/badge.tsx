import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Ocean case study hero tag surface — use `cursor-pointer` on interactive elements. */
export const BADGE_SURFACE_CLASSES =
  "inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 font-reg text-xs font-medium leading-[18px] tracking-[0.02em] text-white transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5";

type BadgeProps = Omit<ComponentPropsWithoutRef<"span">, "className"> & {
  className?: string;
  children: ReactNode;
};

export function Badge({ className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={[BADGE_SURFACE_CLASSES, "cursor-default", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
