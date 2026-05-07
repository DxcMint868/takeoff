import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type LocaleOption = {
  code: string;
  label: string;
  flagSrc: string;
};

const LOCALES: LocaleOption[] = [
  { code: "en", label: "English", flagSrc: "/language/English.svg" },
  { code: "ja", label: "Japanese", flagSrc: "/language/Japanese.svg" },
  { code: "vi", label: "Vietnamese", flagSrc: "/language/Vietnamese.svg" },
  { code: "ko", label: "Korean", flagSrc: "/language/Korean.svg" },
];

type NavLanguageSelectProps = {
  className?: string;
};

const OUTLINE_DARK = "var(--Ouline-Dark, #3A2F50)";

/** UI-only language switcher (no routing / i18n). */
export function NavLanguageSelect({ className = "" }: NavLanguageSelectProps) {
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LOCALES[0]);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div
      ref={rootRef}
      className={`relative max-w-full w-[188px] shrink-0 mq1100:w-auto ${className}`}
    >
      <button
        type="button"
        id={`${id}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer select-none items-center justify-between gap-2.5 rounded-[200px] border border-solid bg-[rgba(135,110,204,0.2)] mq1100:bg-transparent mq1100:border-none py-2 pl-2.5 pr-3.5 font-reg text-[16px] font-semibold tracking-[0.02em] text-white outline-none hover:bg-[rgba(135,110,204,0.28)] focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1333] mq1100:size-10 mq1100:justify-center mq1100:rounded-full mq1100:p-0 mq1100:pl-0 mq1100:pr-0"
        style={{ borderColor: OUTLINE_DARK }}
      >
        <div className="flex items-center gap-2.5 mq1100:gap-0">
          <span
            className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full mq1100:size-8"
            aria-hidden
          >
            <Image
              src={selected.flagSrc}
              alt=""
              width={28}
              height={28}
              className="size-7 object-cover mq1100:size-8"
            />
          </span>
          <span className="whitespace-nowrap mq1100:sr-only">{selected.label}</span>
        </div>

        <span
          className={`ml-0.5 flex size-4 shrink-0 items-center justify-center text-white/90 transition-transform duration-200 mq1100:hidden ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <ChevronIcon />
        </span>
      </button>

      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+10px)] z-[110] box-border min-w-[188px] w-[188px] overflow-hidden rounded-[16px] border border-solid shadow-[0_0_24px_0_rgba(135,110,204,0.08)] mq1100:left-auto mq1100:right-0 mq1100:min-w-[min(100vw-2rem,280px)] mq1100:w-[min(100vw-2rem,280px)] mq1100:max-w-[calc(100vw-2rem)] mq1100:rounded-2xl mq1100:shadow-none"
          style={{ borderColor: OUTLINE_DARK }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-dark"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(135,110,204,0.06)] backdrop-blur-[50px] mq1100:bg-[#876ECC0F] mq1100:backdrop-blur-[100px]"
            aria-hidden
          />
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={`${id}-trigger`}
            className="relative z-[2] m-0 box-border list-none bg-transparent px-1 py-4 mq1100:px-3 mq1100:py-5"
          >
            {LOCALES.map((opt) => {
              const isSel = opt.code === selected.code;
              return (
                <li key={opt.code} role="presentation" className="list-none py-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => {
                      setSelected(opt);
                      close();
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-full py-2.5 px-2 text-left font-reg text-[16px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-[#332952] focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple/80 ${isSel ? "bg-[#332952]" : "bg-transparent"}`}
                  >
                    <span
                      className="flex text-[16px] size-7 shrink-0 items-center justify-center overflow-hidden rounded-full"
                      aria-hidden
                    >
                      <Image
                        src={opt.flagSrc}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 object-cover"
                      />
                    </span>
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
