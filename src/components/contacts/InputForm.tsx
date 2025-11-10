import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { ContactFormData, ErrorsData } from "@/lib/types";
import LoadingSpinner from "../LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const MAX_MESSAGE_LENGTH = 500;
  const MIN_MESSAGE_LENGTH = 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // Name check
    if (formData.name.trim() === "") {
      newErrors.name = errorsData.empty_error[locale] || "Name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = errorsData.name_error[locale] || "Name is too short.";
      isValid = false;
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === "") {
      newErrors.email = errorsData.empty_error[locale] || "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = errorsData.email_error[locale] || "Invalid email address.";
      isValid = false;
    }

    // Message check
    if (formData.message.trim() === "") {
      newErrors.message = errorsData.empty_error[locale] || "Message is required.";
      isValid = false;
    } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.message =
        errorsData.message_short_error[locale].replace(
          "{minLength}",
          MIN_MESSAGE_LENGTH.toString()
        ) || `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
      isValid = false;
    } else if (formData.message.trim().length > MAX_MESSAGE_LENGTH) {
      newErrors.message =
        errorsData.message_long_error[locale].replace("maxLength", MAX_MESSAGE_LENGTH.toString()) ||
        `Message must be less than ${MAX_MESSAGE_LENGTH} characters.`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({ name: "", email: "", message: "" });
    setGeneralError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setGeneralError(data.error || "There was an error sending your message. Try again later.");
      }
    } catch {
      setGeneralError("There was an error sending your message. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!generalError) return;
    const timer = setTimeout(() => setGeneralError(null), 5000);
    return () => clearTimeout(timer);
  }, [generalError]);

  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => setSent(false), 5000);
    return () => clearTimeout(timer);
  }, [sent]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full gap-4">
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
          />
          {errors.email && (
            <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="flex w-full mb-4">
        <div className="flex flex-col w-full items-start gap-1">
          <div className="flex justify-between items-center w-full">
            <label htmlFor="message" className="text-extra-small">
              {contactsFormData.label.message[locale]}
            </label>
            <span className="text-extra-small text-background/90">
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            minLength={MIN_MESSAGE_LENGTH}
            maxLength={MAX_MESSAGE_LENGTH}
            rows={4}
            onChange={handleChange}
            className={`custom-scroll bg-[#c9a94c] shadow-[inset_3px_3px_6px_#a88c3d,inset_-3px_-3px_6px_#e6c75d] w-full rounded-xs py-2 px-3 appearance-none leading-tight focus:outline-none focus:bg-[#d4b758] focus:shadow-[2px_2px_4px_#a88c3d,-2px_-2px_4px_#e6c75d] transition-all duration-200 
              ${errors.message ? "border border-red-500" : "border-transparent"}`}
          />
          {errors.message && (
            <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errors.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        <Button
          type="submit"
          variant="secondary"
          className="inline-flex gap-2 items-center cursor-pointer"
        >
          {isLoading && <LoadingSpinner size={4} />}
          {contactsFormData.button[locale]}
        </Button>
        {formData.email &&
          formData.name &&
          formData.message &&
          contactsFormData?.privacy_policy_message?.[locale] && (
            <p className="text-extra-small text-center text-background/90 mt-2">
              {contactsFormData.privacy_policy_message[locale]}
            </p>
          )}
      </div>
      {sent && (
        <p className="bg-green-600/50 rounded-sm p-4 mt-0 text-center text-green-200">
          {errorsData.success[locale]}
        </p>
      )}
      {generalError && (
        <p className="bg-red-600/50 rounded-sm p-4 mt-0 text-center text-red-200">{generalError}</p>
      )}
    </form>
  );
};

export default ContactForm;
