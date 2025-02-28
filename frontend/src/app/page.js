"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", formData);
      setMessage("✅ Booking Successful!");
      setFormData({ name: "", email: "", phone: "", date: "" });
    } catch (error) {
      setMessage("❌ Booking Failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-white drop-shadow-md mb-6"
      >
        Book Your Appointment
      </motion.h1>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-lg font-semibold text-white bg-black/30 px-4 py-2 rounded-lg shadow-md"
        >
          {message}
        </motion.p>
      )}

      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white/40 backdrop-blur-lg p-6 rounded-lg shadow-xl w-full max-w-md border border-white/30"
      >
        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-white/50 bg-white/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-white/50 bg-white/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border border-white/50 bg-white/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="p-3 border border-white/50 bg-white/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition-all duration-300 shadow-lg hover:scale-105"
        >
          Submit Booking
        </button>
      </motion.form>
    </div>
  );
}
