"use client"

import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaGit, FaLinux, FaHtml5, FaServer, FaCode, FaPhp } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql, SiMongodb, SiSolidity, SiEthereum, SiVercel, SiStripe, SiSupabase, SiTypescript, SiWeb3DotJs, SiLaravel, SiCodeigniter, SiDotnet } from 'react-icons/si'

const skills = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML/CSS', icon: FaHtml5, color: '#E34F26' },
      { name: 'JavaScript/TypeScript', icon: SiTypescript, color: '#3178C6' },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express', icon: FaServer, color: '#000000' },
      { name: 'Python', icon: FaPython, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, color: '#092E20' },
      { name: 'PHP', icon: FaPhp, color: '#777BB4' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'CodeIgniter', icon: SiCodeigniter, color: '#EF4223' },
      { name: 'ASP VB.NET', icon: SiDotnet, color: '#512BD4' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'DevOps & Platforms',
    technologies: [
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'CI/CD', icon: FaGit, color: '#F05032' },
      { name: 'Git', icon: FaGit, color: '#F05032' },
      { name: 'Linux', icon: FaLinux, color: '#FCC624' },
      { name: 'Vercel', icon: SiVercel, color: '#000000' },
      { name: 'Stripe', icon: SiStripe, color: '#00AFFB' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    ],
  },
  {
    category: 'Blockchain',
    technologies: [
      { name: 'Solidity', icon: SiSolidity, color: '#363636' },
      { name: 'Web3.js', icon: SiEthereum, color: '#F16822' },
      { name: 'Ethereum', icon: SiEthereum, color: '#627EEA' },
      { name: 'Smart Contracts', icon: SiSolidity, color: '#363636' },
    ],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.technologies.map((tech) => (
                  <li key={tech.name} className="text-gray-300 flex items-center">
                    {tech.icon && <tech.icon className="w-6 h-6 mr-2" style={{ color: tech.color }} />}
                    {tech.name}
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