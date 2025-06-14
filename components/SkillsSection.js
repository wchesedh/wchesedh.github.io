"use client"

import { motion } from 'framer-motion'

const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript/TypeScript'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'DevOps',
    technologies: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'],
  },
  {
    category: 'Blockchain',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
  },
]

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.technologies.map((tech) => (
                  <li key={tech} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 