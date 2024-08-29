import React, { useState } from 'react';

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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          telegram: '',
          companyName: '',
          projectDetails: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-start justify-start pt-[23px] px-4 pb-0 box-border text-sm text-white-60 font-reg">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
        <div>
            <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
        </div>
        <div className="grid grid-cols-1 grid-cols-2 gap-8 gap-4">
            <div>
            <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
            />
            </div>
            <div>
            <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="Telegram"
                className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
            </div>
        </div>
        <div>
            <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
        </div>
        <div>
            <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60 min-h-[35px] resize-none"
            ></textarea>
        </div>
        <div className="flex flex-col items-end justify-end py-0 text-right text-xl text-white font-sora">
            <button
            type="submit"
            className="bg-transparent hover:bg-transparent font-normal flex items-center text-inherit tracking-[0.02em] font-normal font-[inherit] cursor-pointer">
            Submit
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-500 text-sm mt-2">Form submitted successfully! Thank you for your interest in working with us.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm mt-2">Form submission failed. Please try again.</p>
            )}
        </div>
        </form>
    </div>
  );
};

export default ContactForm;
