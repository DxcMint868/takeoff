import React, { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./icons";
import { useTranslation } from "../lib/i18n/use-translation";

const fieldClass =
  "w-full bg-transparent border-x-0 border-t-0 border-b border-white-30 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-white-60 font-reg text-sm leading-[22px] tracking-[0.02em] !text-white";

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

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const projectDetailsRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegram: "",
    companyName: "",
    projectDetails: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
        setFormData({
          fullName: "",
          email: "",
          telegram: "",
          companyName: "",
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
