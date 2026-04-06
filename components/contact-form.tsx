import React, { useState } from 'react';
import { ArrowIcon } from './icons';

const fieldClass =
  "w-full bg-transparent border-x-0 border-t-0 border-b border-white-30 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-white-60 font-reg text-sm leading-[22px] tracking-[0.02em] text-white placeholder:text-white-60";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telegram: '',
    companyName: '',
    projectDetails: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', telegram: '', companyName: '', projectDetails: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="w-full max-w-[420px] shrink-0 mq900:max-w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className={fieldClass}
        />

        <div className="grid grid-cols-2 gap-5 mq450:grid-cols-1 mq450:gap-10">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={fieldClass}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address"
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="Telegram"
            className={fieldClass}
          />
        </div>

        <input
          type="text"
          name="companyName"
          required
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className={fieldClass}
        />

        <textarea
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className={`${fieldClass} min-h-[35px] resize-none`}
        />

        <div className="flex flex-col items-end">
          <button
            type="submit"
            className="bg-transparent border-0 p-0 flex items-center gap-2 text-white font-sora font-normal text-xl leading-[26px] tracking-[0.02em] cursor-pointer hover:opacity-80 transition-opacity"
          >
            Submit
            <ArrowIcon width="32" height="24" />
          </button>
          {submitStatus === 'success' && (
            <p className="text-green-500 text-sm mt-2 font-reg">
              Form submitted successfully!
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500 text-sm mt-2 font-reg">
              Submission failed. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
