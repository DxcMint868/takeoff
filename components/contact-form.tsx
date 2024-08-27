//implement contact form

import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <div className="w-[420px] flex flex-col items-start justify-start pt-[23px] px-0 pb-0 box-border min-w-[420px] max-w-full text-sm text-white-60 font-reg mq700:min-w-full mq900:flex-1">
        <form className="w-full max-w-md space-y-8">
        <div>
            <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
        </div>
        <div className="grid grid-cols-1 grid-cols-2 gap-8 gap-4">
            <div>
            <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
            </div>
            <div>
            <input
                type="text"
                placeholder="Telegram"
                className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
            </div>
        </div>
        <div>
            <input
            type="text"
            placeholder="Company Name"
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60"
            />
        </div>
        <div>
            <textarea
            placeholder="Tell us about your project..."
            className="w-full bg-transparent border-x-0 border-t-0 border-b border-gray-600 rounded-none px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300 font-reg text-sm text-white-60 min-h-[35px] resize-none"

            ></textarea>
        </div>
        <div className="flex items-start justify-end py-0 text-right text-xl text-white font-sora">
            <button
            type="submit"
            className="bg-transparent hover:bg-transparentfont-normal flex items-center text-inherit tracking-[0.02em] font-normal font-[inherit]">
            Submit
            </button>
        </div>
        </form>
    </div>
  );
};

export default ContactForm;
