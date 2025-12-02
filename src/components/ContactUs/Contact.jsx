/* eslint-disable no-unused-vars */
"use client";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="py-20 px-6 bg-base-200 lg:px-20">
        {/* Epic Animated Gradient Heading — Powered by your index.css */}
        <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="gradient-text text-5xl md:text-6xl font-black text-center mb-20 tracking-tight [line-height:1.2] pb-2"
        >
        Let’s Build Something Epic
        </motion.h2>

      {/* MAIN WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — GLASS FORM */}
        <div className="
          p-8 rounded-3xl 
          bg-base-100
          backdrop-blur-xl 
          border border-white/20 
          shadow-xl
        ">
          <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>

          <form className="space-y-6">

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 
                  bg-base-200 
                  border border-gray-400/40 dark:border-gray-200/20 
                  rounded-xl 
                  focus:border-primary dark:focus:border-primary
                  outline-none transition
                "
              />
              <label className="absolute left-3 -top-3 bg-body dark:bg-body-dark px-2 text-sm">
                Name
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 
                  bg-base-200
                  border border-gray-400/40 dark:border-gray-200/20 
                  rounded-xl 
                  focus:border-primary dark:focus:border-primary
                  outline-none transition
                "
              />
              <label className="absolute left-3 -top-3 bg-body dark:bg-body-dark px-2 text-sm">
                Email
              </label>
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="
                  w-full px-4 py-3 
                  bg-base-200
                  border border-gray-400/40 dark:border-gray-200/20 
                  rounded-xl 
                  focus:border-primary dark:focus:border-primary
                  outline-none transition
                "
              ></textarea>
              <label className="absolute left-3 -top-3 bg-body dark:bg-body-dark px-2 text-sm">
                Message
              </label>
            </div>

            {/* SEND BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold 
                bg-primary text-button 
                dark:bg-primary dark:text-button
                hover:opacity-90 transition
              "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — CONTACT INFO GLASS CARDS */}
        <div className="space-y-6">

          {[
            {
              icon: <MdEmail size={30} />,
              title: "Email",
              detail: "support@youragency.com",
            },
            {
              icon: <MdPhone size={30} />,
              title: "Phone",
              detail: "+1 (800) 123-4567",
            },
            {
              icon: <MdLocationOn size={30} />,
              title: "Address",
              detail: "Dhaka, Bangladesh",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="
                flex items-center gap-5 p-6 
                bg-base-100
                border border-white/20 
                backdrop-blur-xl rounded-2xl 
                shadow-xl 
                hover:border-primary dark:hover:border-primary 
                transition
              "
            >
              <div className="text-primary dark:text-primary">
                {item.icon}
              </div>

              <div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MAP SECTION
      <div className="mt-14 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          className="w-full h-[350px] md:h-[450px]"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.843864604002!2d90.39945297533288!3d23.75270278865079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf51135f6a51%3A0x8f61896d1257e0f4!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
        ></iframe>
      </div> */}
    </section>
  );
}