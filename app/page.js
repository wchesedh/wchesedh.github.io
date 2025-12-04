"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaGit, FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaServer, FaHtml5, FaLinux, FaPhp } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiTypescript, SiLaravel, SiCodeigniter, SiDotnet, SiVercel, SiStripe, SiSupabase, SiDjango, SiSolidity, SiEthereum, SiWeb3DotJs } from 'react-icons/si'

const projectLinks = [
  { name: 'Aguaboo', url: 'https://aguaboo.com', image: '/images/aguaboo.png', description: 'A modern water delivery platform for ordering and management.' },
  { name: 'TrackWise', url: 'https://teacher-app-seven.vercel.app/', image: '/images/trackwise.png', description: 'A teacher-parent forum for discussing children\'s daily activities.' },
  { name: 'University Online Document Request', url: 'https://sis.cmu.edu.ph/odrms', image: '/images/odrms.png', description: 'Online Document Request Management System for CMU students and staff.' },
  { name: 'CMUPress', url: 'https://apps.cmu.edu.ph/cmupress', image: '/images/cmupress.png', description: 'CMU Press platform for academic publishing and resources.' },
  { name: 'HR Online Document Request', url: 'https://apps.cmu.edu.ph/hrodrs', image: '/images/hrodrs.png', description: 'HR Online Document Request System for CMU employees.' },
  { name: 'CAEP South East Asia', url: 'https://caepsea.com', image: '/images/caepsea.png', description: 'Study Work Travel Application System by CAEP South East Asia.' },
  { name: 'M.M. Stud Farm Management System', url: 'https://qhive-innovations.com/studfarm/', image: '/images/studfarm.png', description: 'A web-based management system for M.M. Stud Farm operations.' },
  { name: 'Point of Sale System', url: 'https://wcplpointofsale.onrender.com', image: '/images/pospic.png', description: 'A point-of-sale web application for managing sales and transactions.' },
  { name: 'Dental Clinic Management System', url: 'https://rodrigoorthodentalclinic.onrender.com/', image: '/images/dmspic.png', description: 'A dental clinic management system for patient operations.' },
]

const certificationsData = [
  { id: 1, title: '25k USD Forex Prop Firm Evaluation - Phase 1', image: '/images/certifications/firstCertFp.png', description: 'Successfully completed Phase 1 of a 25,000 USD Forex Prop Firm Evaluation.' },
  { id: 2, title: '25k USD Forex Prop Firm Evaluation - Phase 2', image: '/images/certifications/2ndCertFp.png', description: 'Successfully completed Phase 2 of a 25,000 USD Forex Prop Firm Evaluation.' },
  { id: 3, title: '10k USD Forex Prop Firm Evaluation - Phase 1', image: '/images/certifications/3rdCertFp.png', description: 'Successfully completed Phase 1 of a 10,000 USD Forex Prop Firm Evaluation.' },
  { id: 4, title: '10k USD Forex Prop Firm Evaluation - Phase 2', image: '/images/certifications/4thCertFp.png', description: 'Successfully completed Phase 2 of a 10,000 USD Forex Prop Firm Evaluation.' },
  { id: 5, title: 'PHP Web Application Framework CodeIgniter 4 Training', image: '/images/certifications/dictCert1.jpg', description: 'Completed a 3-day training on PHP web application framework CodeIgniter 4.' },
  { id: 6, title: 'Web Development for Web Developers Training', image: '/images/certifications/dictCert2.jpg', description: 'Completed a 40-hour, 5-day training in web development for web developers.' },
]

const keySkills = [
  {
    category: 'Frontend Development',
    color: 'from-blue-500 to-cyan-500',
    items: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend Development',
    color: 'from-purple-500 to-pink-500',
    items: ['Supabase', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Laravel', 'CodeIgniter', 'RESTful APIs']
  },
  {
    category: 'Programming Languages',
    color: 'from-green-500 to-emerald-500',
    items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'ASP VB.NET', 'SQL']
  },
  {
    category: 'Tools & Technologies',
    color: 'from-orange-500 to-red-500',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile Methodologies', 'Render', 'Hostinger', 'Railway']
  }
]

const skillsByCategory = [
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
      { name: 'Render', icon: FaServer, color: '#46E3B7' },
      { name: 'Hostinger', icon: FaServer, color: '#673DE6' },
      { name: 'Railway', icon: FaServer, color: '#0B0D0E' },
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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a
              href="/"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Image
                src="/images/weljIcon.png"
                alt="Weljo Chesedh"
                width={56}
                height={56}
                className="object-contain"
              />
            </motion.a>
            <div className="hidden md:flex gap-8 items-center">
              {['About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="/v1"
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors border-l border-gray-300 pl-6 ml-2"
              >
                v1
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Geometric Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.15 }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#3B82F6" strokeWidth="0.8"/>
              </pattern>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            
            {/* Subtle Animated Grid */}
            <rect width="100%" height="100%" fill="url(#grid)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 80,80; 0,0"
                dur="25s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Floating Geometric Shapes */}
            <g>
              {/* Hexagon 1 - Top Left */}
              <polygon points="180,160 220,180 220,220 180,240 140,220 140,180" fill="url(#grad1)" opacity="0.3">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 20,-15; 0,0"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </polygon>
              
              {/* Hexagon 2 - Top Right */}
              <polygon points="960,320 1000,340 1000,380 960,400 920,380 920,340" fill="url(#grad1)" opacity="0.3">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -15,20; 0,0"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </polygon>
              
              {/* Hexagon 3 - Bottom Left */}
              <polygon points="240,480 280,500 280,540 240,560 200,540 200,500" fill="url(#grad1)" opacity="0.3">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 25,15; 0,0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </polygon>
              
              {/* Hexagon 4 - Bottom Right */}
              <polygon points="1020,200 1060,220 1060,260 1020,280 980,260 980,220" fill="url(#grad1)" opacity="0.3">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -12,-20; 0,0"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </polygon>
            </g>
            
            {/* Subtle Connecting Lines */}
            <g stroke="url(#grad1)" strokeWidth="1" fill="none" opacity="0.2">
              <line x1="120" y1="120" x2="360" y2="280">
                <animate attributeName="x2" values="360;400;360" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="1080" y1="160" x2="840" y2="320">
                <animate attributeName="x2" values="840;800;840" dur="7s" repeatCount="indefinite" />
              </line>
              <line x1="600" y1="40" x2="540" y2="200">
                <animate attributeName="y2" values="200;240;200" dur="8s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30"></div>
              <Image
                src="/images/profilePic.png"
                alt="Weljo Chesedh"
                fill
                className="rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weljo Chesedh
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Full-Stack Developer</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Building software from the ground up, from business rules to deployment. 
              Creating modern, scalable web applications with clean code and best practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-12 text-center"
          >
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4+</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            About
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg text-gray-700 leading-relaxed"
          >
            <p>
              Building software from the ground up comes naturally, starting from learning the business rules, 
              designing the database, coding both frontend and backend, and taking the app all the way through deployment.
            </p>
            <p>
              Experienced in creating modern, responsive web apps using the latest tools and best practices, 
              always focused on making solutions that work smoothly and scale well.
            </p>
            <p>
              With expertise in both front-end and back-end development, I specialize in creating responsive 
              web applications using modern technologies and best practices. I'm constantly adapting to new 
              technologies to stay at the forefront of web development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Key Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12"
          >
            Core competencies and technologies I work with
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {keySkills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 group"
              >
                <motion.h3 
                  className={`text-xl font-bold mb-4 bg-gradient-to-r ${skillGroup.color} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {skillGroup.category}
                </motion.h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.03, duration: 0.4, ease: "easeOut" }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-300 cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills & Technologies with Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Skills & Technologies
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Visual overview of technologies I use
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsByCategory.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
              >
                <motion.h3 
                  className="text-lg font-bold mb-4 text-gray-900"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.category}
                </motion.h3>
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05, duration: 0.4, ease: "easeOut" }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <tech.icon 
                          className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110" 
                          style={{ color: tech.color }} 
                        />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12"
          >
            Sample projects showcased below. I also have projects running locally and desktop applications.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectLinks.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Visit Site
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a
              href="https://www.linkedin.com/in/weljo-chesedh-libnao-55b130368/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <FaLinkedin className="text-4xl text-blue-600 mb-3" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">LinkedIn</span>
            </a>
            <a
              href="https://www.facebook.com/weljo.chesedh.2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <FaFacebook className="text-4xl text-blue-600 mb-3" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Facebook</span>
            </a>
            <a
              href="mailto:weljo.chesedh@gmail.com"
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all group"
            >
              <FaEnvelope className="text-4xl text-red-500 mb-3" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-red-500">Email</span>
            </a>
            <a
              href="https://www.instagram.com/welj/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-pink-500 hover:shadow-lg transition-all group"
            >
              <FaInstagram className="text-4xl text-pink-500 mb-3" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-500">Instagram</span>
            </a>
            <a
              href="https://twitter.com/wlibnao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-800 hover:shadow-lg transition-all group"
            >
              <FaTwitter className="text-4xl text-gray-800 mb-3" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-800">Twitter</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Weljo Chesedh. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
