import React, { useState } from "react";
import Button from "../ui/Button";
import { ContactFormData, ErrorsData } from "@/lib/types";

interface Props {
  contactsFormData: ContactFormData;
  errorsData: ErrorsData;
  locale: "lv" | "en" | "ru";
}

const ContactForm: React.FC<Props> = ({ contactsFormData, errorsData, locale }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // Name check
    if (formData.name.trim() === "") {
      newErrors.name = errorsData.empty_error[locale];
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = errorsData.name_error[locale];
      isValid = false;
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === "") {
      newErrors.email = errorsData.empty_error[locale];
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = errorsData.email_error[locale];
      isValid = false;
    }

    // Message check
    if (formData.message.trim() === "") {
      newErrors.message = errorsData.empty_error[locale];
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    console.log("Form data: ", formData);

    // Fetch to API logic ...
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="flex flex-col w-full items-start gap-1">
          <label htmlFor="name" className="text-extra-small">
            {contactsFormData.label.name[locale]}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`
                bg-[#c9a94c] shadow-[inset_3px_3px_6px_#a88c3d,inset_-3px_-3px_6px_#e6c75d] w-full rounded-xs py-2 px-3 appearance-none focus:outline-none focus:bg-[#d4b758] focus:shadow-[2px_2px_4px_#a88c3d,-2px_-2px_4px_#e6c75d] transition-all duration-200
                ${errors.name ? "border border-red-500" : "border-transparent"}
            `}
            required
          />
          <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
        </div>
        <div className="flex flex-col w-full items-start gap-1">
          <label htmlFor="email" className="text-extra-small">
            {contactsFormData.label.email[locale]}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`
                bg-[#c9a94c] shadow-[inset_3px_3px_6px_#a88c3d,inset_-3px_-3px_6px_#e6c75d] w-full rounded-xs py-2 px-3 appearance-none focus:outline-none focus:bg-[#d4b758] focus:shadow-[2px_2px_4px_#a88c3d,-2px_-2px_4px_#e6c75d] transition-all duration-200
                ${errors.email ? "border border-red-500" : "border-transparent"}
            `}
            required
          />
          {errors.email && (
            <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="flex w-full mb-4">
        <div className="flex flex-col w-full items-start gap-1">
          <label htmlFor="name" className="text-extra-small">
            {contactsFormData.label.message[locale]}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            rows={4}
            onChange={handleChange}
            className="custom-scroll bg-[#c9a94c] shadow-[inset_3px_3px_6px_#a88c3d,inset_-3px_-3px_6px_#e6c75d] w-full rounded-xs py-2 px-3 appearance-none leading-tight focus:outline-none focus:bg-[#d4b758] focus:shadow-[2px_2px_4px_#a88c3d,-2px_-2px_4px_#e6c75d] transition-all duration-200"
            required
          />
          {errors.message && (
            <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errors.message}</p>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button type="submit" variant="secondary">
          {contactsFormData.button[locale]}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
