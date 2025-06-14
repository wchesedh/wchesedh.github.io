"use client"

import { motion } from 'framer-motion'

const skills = [
  { name: 'React', category: 'Frontend', level: 90 },
  { name: 'Next.js', category: 'Frontend', level: 85 },
  { name: 'Three.js', category: 'Frontend', level: 80 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'MongoDB', category: 'Backend', level: 80 },
  { name: 'TypeScript', category: 'Language', level: 85 },
  { name: 'Python', category: 'Language', level: 75 },
  { name: 'AWS', category: 'Cloud', level: 70 },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {['Frontend', 'Backend', 'Language', 'Cloud'].map((category) => (
              <div key={category} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">{category}</h3>
                <div className="space-y-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                <div className="text-3xl font-bold text-blue-400">{skill.level}%</div>
                <div className="text-sm text-gray-400 mt-2">{skill.category}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 