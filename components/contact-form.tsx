import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowIcon } from "./icons";
import { useTranslation } from "../lib/i18n/use-translation";
import { CONTACT_INTERESTED_SERVICE_OPTIONS } from "../lib/contact-interested-services";

const fieldClass =
  "w-full bg-transparent border-x-0 border-t-0 border-b border-white-30 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-white-60 font-reg text-sm leading-[22px] tracking-[0.02em] !text-white";

/** Same as text fields but without `!text-white` so summary can be muted when empty. */
const comboboxTriggerClass =
  "w-full appearance-none border-x-0 border-t-0 border-b border-solid border-b-white-30 bg-transparent rounded-none px-0 py-2 text-left font-reg text-sm leading-[22px] tracking-[0.02em] focus:outline-none focus:ring-0 focus:border-b-white-60 [border-bottom-color:theme(colors.white-30)] focus:[border-bottom-color:theme(colors.white-60)]";

const fieldStyle: React.CSSProperties = {
  color: "#fff",
  WebkitTextFillColor: "#fff",
  caretColor: "#fff",
};

const TEXTAREA_BASE_HEIGHT = 39;

const textareaStyle: React.CSSProperties = {
  ...fieldStyle,
  minHeight: `${TEXTAREA_BASE_HEIGHT}px`,
  boxSizing: "border-box",
};

/** Minimal stroke checkmark (square caps) — avoids skewed Unicode glyphs. */
function ServiceCheckIcon() {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      className="text-white"
      aria-hidden
    >
      <path
        d="M1 4 L3.8 6.8 L9 1"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const projectDetailsRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegram: "",
    companyName: "",
    interestedServices: [] as string[],
    projectDetails: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();
  const [menuPlacement, setMenuPlacement] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const toggleInterestedService = (notionName: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: prev.interestedServices.includes(notionName)
        ? prev.interestedServices.filter((n) => n !== notionName)
        : [...prev.interestedServices, notionName],
    }));
  };

  useLayoutEffect(() => {
    if (!servicesOpen) {
      setMenuPlacement(null);
      return;
    }
    const el = triggerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setMenuPlacement({
        top: r.bottom + 6,
        left: r.left,
        width: Math.max(r.width, 200),
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [servicesOpen, formData.interestedServices]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (servicesRootRef.current?.contains(t)) return;
      if (menuListRef.current?.contains(t)) return;
      setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const textarea = projectDetailsRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    textarea.style.height = `${Math.max(textarea.scrollHeight, TEXTAREA_BASE_HEIGHT)}px`;
  }, [formData.projectDetails]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setServicesOpen(false);
        setFormData({
          fullName: "",
          email: "",
          telegram: "",
          companyName: "",
          interestedServices: [],
          projectDetails: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="w-full max-w-[420px] shrink-0 mq900:max-w-full">
      <form
        onSubmit={handleSubmit}
        className="contact-form w-full flex flex-col gap-10"
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t("contact.form.fullName")}
          className={fieldClass}
          style={fieldStyle}
        />

        <div className="grid grid-cols-2 gap-5 mq450:grid-cols-1 mq450:gap-10">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.form.email")}
            className={fieldClass}
            style={fieldStyle}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address"
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder={t("contact.form.telegram")}
            className={fieldClass}
            style={fieldStyle}
          />
        </div>

        <input
          type="text"
          name="companyName"
          required
          value={formData.companyName}
          onChange={handleChange}
          placeholder={t("contact.form.companyName")}
          className={fieldClass}
          style={fieldStyle}
        />

        <fieldset className="m-0 border-0 p-0">
          <legend className="sr-only">{t("contact.form.interestedServices")}</legend>
          <div ref={servicesRootRef} className="relative isolate">
            <button
              ref={triggerRef}
              type="button"
              id={`${listboxId}-trigger`}
              aria-expanded={servicesOpen}
              aria-haspopup="listbox"
              aria-controls={listboxId}
              onClick={() => setServicesOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setServicesOpen(false);
                }
              }}
              className={`${comboboxTriggerClass} flex min-h-[2.5rem] w-full cursor-pointer items-start justify-between gap-2 py-2 text-left`}
            >
              <span
                className="line-clamp-2 min-w-0 flex-1 break-words font-reg text-sm leading-[22px] tracking-[0.02em]"
                style={{
                  color: formData.interestedServices.length ? "#fff" : "#a4a1ad",
                  WebkitTextFillColor: formData.interestedServices.length
                    ? "#fff"
                    : "#a4a1ad",
                }}
              >
                {formData.interestedServices.length === 0
                  ? t("contact.form.interestedServices")
                  : CONTACT_INTERESTED_SERVICE_OPTIONS.filter((o) =>
                      formData.interestedServices.includes(o.notionName),
                    )
                      .map((o) => t(o.labelKey))
                      .join(", ")}
              </span>
              <svg
                className={`mt-1 shrink-0 opacity-60 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 1l5 5 5-5"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {servicesOpen &&
              menuPlacement &&
              typeof document !== "undefined" &&
              createPortal(
                <ul
                  ref={menuListRef}
                  id={listboxId}
                  role="listbox"
                  aria-multiselectable="true"
                  aria-labelledby={`${listboxId}-menu-title`}
                  style={{
                    position: "fixed",
                    top: menuPlacement.top,
                    left: menuPlacement.left,
                    width: menuPlacement.width,
                    maxHeight: `min(16rem, calc(100vh - ${Math.round(menuPlacement.top)}px - 16px))`,
                    zIndex: 200,
                  }}
                  className="scrollbar-hide m-0 list-none overflow-y-auto rounded-lg border border-white/20 bg-[#1e1833] p-0 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
                >
                  <li role="presentation" className="sticky top-0 z-10 list-none bg-[#1e1833] p-0">
                    <div
                      id={`${listboxId}-menu-title`}
                      className="pointer-events-none border-b border-white/15 px-3 py-2 font-reg text-[11px] font-normal uppercase leading-tight tracking-[0.14em] text-[#a4a1ad]"
                    >
                      {t("contact.form.interestedServices")}
                    </div>
                  </li>
                  {CONTACT_INTERESTED_SERVICE_OPTIONS.map((o) => {
                    const selected = formData.interestedServices.includes(
                      o.notionName,
                    );
                    return (
                      <li key={o.notionName} className="list-none p-0">
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className="flex w-full cursor-pointer items-center gap-3 border-0 bg-[#1e1833] px-3 py-2.5 text-left font-reg text-sm leading-[22px] tracking-[0.02em] text-white hover:bg-[#2a2444] focus:bg-[#2a2444] focus:outline-none"
                          style={{
                            color: "#ffffff",
                            WebkitTextFillColor: "#ffffff",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleInterestedService(o.notionName);
                          }}
                        >
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/50 bg-transparent"
                            aria-hidden
                          >
                            {selected ? <ServiceCheckIcon /> : null}
                          </span>
                          <span className="min-w-0 flex-1 text-white">
                            {t(o.labelKey)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>,
                document.body,
              )}
          </div>
        </fieldset>

        <textarea
          ref={projectDetailsRef}
          name="projectDetails"
          rows={1}
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder={t("contact.form.projectDetails")}
          className={`${fieldClass} resize-none overflow-hidden`}
          style={textareaStyle}
        />

        <div className="flex flex-col items-end">
          <button
            type="submit"
            className="bg-transparent border-0 p-0 flex items-center gap-2 text-white font-sora font-normal text-xl leading-[26px] tracking-[0.02em] cursor-pointer hover:opacity-80 transition-opacity"
          >
            {t("contact.form.submit")}
            <ArrowIcon width="32" height="24" />
          </button>
          {submitStatus === "success" && (
            <p className="text-green-500 text-sm mt-2 font-reg">
              {t("contact.form.success")}
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 text-sm mt-2 font-reg">
              {t("contact.form.error")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
