export function GradientGlow({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "sm";
}) {
  const sizeClass =
    size === "sm"
      ? "h-[320px] w-[640px] opacity-[0.18] blur-[90px]"
      : "h-[480px] w-[900px] opacity-[0.24] blur-[109px]";

  return (
    <div
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${sizeClass} ${className}`}
      aria-hidden
      style={{
        background:
          "linear-gradient(90deg, #613BAA 0%, #AF51B9 33%, #EB6A97 71%, #FD9E67 96.5%)",
      }}
    />
  );
}
