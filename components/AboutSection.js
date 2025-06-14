"use client"

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I am a passionate Full Stack Developer with a strong focus on creating modern, responsive web applications. With expertise in both frontend and backend technologies, I strive to build intuitive and efficient solutions that enhance user experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With expertise in both front-end and back-end development, I specialize in creating seamless, responsive web applications using modern technologies and best practices. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 p-8 rounded-lg shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Key Skills</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl text-blue-400 mb-2">Frontend Development</h4>
                <p className="text-gray-300">React, Next.js, Three.js, Tailwind CSS, Framer Motion</p>
              </div>
              <div>
                <h4 className="text-xl text-purple-400 mb-2">Backend Development</h4>
                <p className="text-gray-300">Node.js, Express, MongoDB, PostgreSQL, RESTful APIs</p>
              </div>
              <div>
                <h4 className="text-xl text-green-400 mb-2">Programming Languages</h4>
                <p className="text-gray-300">JavaScript, TypeScript, Python, PHP, SQL</p>
              </div>
              <div>
                <h4 className="text-xl text-yellow-400 mb-2">Tools & Technologies</h4>
                <p className="text-gray-300">Git, Docker, AWS, CI/CD, Agile Methodologies</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 