// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "../../components/contact_form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — WEN EL DAHRA",
  description: "Get in touch with us. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brown hover:text-dark-brown text-sm font-medium mb-6 transition"
        >
          ← Back to Home
        </Link>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </main>
  );
}