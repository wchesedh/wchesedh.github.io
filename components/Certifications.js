"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const certificationsData = [
  {
    id: 1,
    title: '25k USD Forex Prop Firm Evaluation - Phase 1',
    image: '/images/certifications/firstCertFp.png',
    description: 'Successfully completed Phase 1 of a 25,000 USD Forex Prop Firm Evaluation.',
  },
  {
    id: 2,
    title: '25k USD Forex Prop Firm Evaluation - Phase 2',
    image: '/images/certifications/2ndCertFp.png',
    description: 'Successfully completed Phase 2 of a 25,000 USD Forex Prop Firm Evaluation.',
  },
  {
    id: 3,
    title: '10k USD Forex Prop Firm Evaluation - Phase 1',
    image: '/images/certifications/3rdCertFp.png',
    description: 'Successfully completed Phase 1 of a 10,000 USD Forex Prop Firm Evaluation.',
  },
  {
    id: 4,
    title: '10k USD Forex Prop Firm Evaluation - Phase 2',
    image: '/images/certifications/4thCertFp.png',
    description: 'Successfully completed Phase 2 of a 10,000 USD Forex Prop Firm Evaluation.',
  },
  {
    id: 5,
    title: 'PHP Web Application Framework CodeIgniter 4 Training',
    image: '/images/certifications/dictCert1.jpg',
    description: 'Completed a 3-day training on PHP web application framework CodeIgniter 4.',
  },
  {
    id: 6,
    title: 'Web Development for Web Developers Training',
    image: '/images/certifications/dictCert2.jpg',
    description: 'Completed a 40-hour, 5-day training in web development for web developers.',
  },
];

export default function Certifications() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Certifications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center"
            >
              <a href={cert.image} target="_blank" rel="noopener noreferrer" className="relative w-full h-48 mb-4 block cursor-pointer">
                <Image src={cert.image} alt={cert.title} layout="fill" objectFit="contain" />
              </a>
              <h3 className="text-xl font-bold text-white text-center mb-2">{cert.title}</h3>
              <p className="text-gray-300 text-center text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 