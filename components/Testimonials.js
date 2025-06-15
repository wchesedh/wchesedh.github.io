"use client"

import React from 'react'
import { motion } from 'framer-motion'

const testimonialsData = [
  {
    id: 1,
    quote: "[Your Name] is an exceptional developer with a keen eye for detail. Their ability to deliver high-quality code and innovative solutions consistently exceeds expectations.",
    name: "Client Name 1",
    title: "CEO, Company A",
  },
  {
    id: 2,
    quote: "Working with [Your Name] was a pleasure. They are highly skilled, proactive, and always willing to go the extra mile to ensure project success. Highly recommended!",
    name: "Colleague Name 1",
    title: "Lead Developer, Company B",
  },
  {
    id: 3,
    quote: "[Your Name] brought a fresh perspective and strong technical expertise to our team. Their contributions were invaluable in overcoming complex challenges and meeting tight deadlines.",
    name: "Manager Name 1",
    title: "Project Manager, Company C",
  },
  // Add more testimonials as needed
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center py-16">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
      >
        Testimonials & Recommendations
      </motion.h2>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          >
            <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
            <p className="text-white font-semibold">- {testimonial.name}</p>
            <p className="text-gray-400 text-sm">{testimonial.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 