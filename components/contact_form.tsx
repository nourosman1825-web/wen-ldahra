// app/components/contact_form.tsx
"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");

  const validateName = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && trimmed.length < 3) {
      setNameError("Name must be at least 3 characters long");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name before submitting
    const isNameValid = validateName(name);
    if (!isNameValid) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Thank you for your message! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
    setNameError("");
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setMessage("");
    setNameError("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-beige shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-brown mb-2">Contact Us</h2>
      <p className="text-sm text-text/70 mb-6">
        Have a question or suggestion? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name (min 3 characters)"
            className={`w-full px-4 py-2.5 bg-cream border rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown transition ${
              nameError ? 'border-red-500 focus:ring-red-500/20' : 'border-beige'
            }`}
            required
          />
          {nameError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <span>⚠️</span> {nameError}
            </p>
          )}
          <p className="mt-1 text-xs text-text/50">
            Minimum 3 characters required
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 bg-cream border border-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown transition"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={4}
            className="w-full px-4 py-2.5 bg-cream border border-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 focus:border-brown transition resize-y"
            required
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !!nameError}
            className="bg-brown hover:bg-dark-brown text-white font-medium py-2.5 px-6 rounded-xl transition shadow-sm active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-6 rounded-xl transition active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-transparent hover:bg-beige/50 text-brown border border-brown font-medium py-2.5 px-6 rounded-xl transition active:scale-95 text-sm"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
   