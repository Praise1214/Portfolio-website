import React, { useState } from "react";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setForm({ name: "", email: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 1500);
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding mt-12 md:mt-16">
      <div className="w-full h-full md:px-10 px-5 ">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-8 md:mt-10">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-5 md:p-6">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                <div>
                  <label htmlFor="name" className="text-sm text-text-secondary">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your name?"
                    required
                    className="contact-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-text-secondary">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                    className="contact-input"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-text-secondary">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows={3}
                    required
                    className="contact-input"
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">{loading ? "Sending..." : sent ? "Sent!" : "Send Message"}</p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
