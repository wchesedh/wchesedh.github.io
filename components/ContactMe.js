import React from 'react'
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si' // For Gmail specific icon if needed

export default function ContactMe() {
  return (
    <section id="contact" className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center justify-center py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Contact Me</h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl px-4">
        <a
          href="https://www.linkedin.com/in/weljo-chesedh-libnao-55b130368/" // Replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaLinkedin className="text-blue-400 text-6xl mb-4" />
          <span className="text-white text-xl font-semibold">LinkedIn</span>
        </a>
        <a
          href="https://www.facebook.com/welj/" // Replace with your Facebook URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          <FaFacebook className="text-blue-600 text-6xl mb-4" />
          <span className="text-white text-xl font-semibold">Facebook</span>
        </a>
        <a
          href="" // Replace with your Gmail address
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaEnvelope className="text-red-500 text-6xl mb-4" /> {/* Using FaEnvelope for generic email, but could use SiGmail if you install react-icons/si */}
          <span className="text-white text-xl font-semibold">Gmail</span>
        </a>
        <a
          href="https://www.instagram.com/welj/" // Replace with your Instagram URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaInstagram className="text-pink-500 text-6xl mb-4" />
          <span className="text-white text-xl font-semibold">Instagram</span>
        </a>
        <a
          href="https://twitter.com/welj" // Replace with your X (Twitter) URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaTwitter className="text-white text-6xl mb-4" />
          <span className="text-white text-xl font-semibold">X (Twitter)</span>
        </a>
      </div>
    </section>
  )
}
 