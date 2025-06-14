import Hero3D from '../components/Hero3d'
import Image from 'next/image'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Hero3D />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Profile and Text */}
            <div className="text-left space-y-6 z-10">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-glow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
        <Image
                    src="/images/profilePic.png"
                    alt="Profile Picture"
                    fill
                    className="object-cover"
          priority
        />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Weljo Chesedh
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                Full Stack Developer & Web3 Specialist
              </p>
              <div className="flex gap-4 pt-4">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  View Projects
                </button>
                <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right side - Stats or Featured Content */}
            <div className="hidden md:block">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">Latest Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-blue-400">98%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-purple-400">150+</p>
                    <p className="text-sm text-gray-400">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <p className="text-gray-300">
                  I'm a passionate Full Stack Developer with a deep focus on Web3 technologies. With 5+ years of experience in software development, I specialize in building decentralized applications and innovative solutions that leverage blockchain technology.
                </p>
                <p className="text-gray-300">
                  My approach combines modern development practices with cutting-edge Web3 technologies, allowing me to create scalable and secure applications. I'm particularly interested in developing user-friendly dApps that make blockchain technology accessible to everyone.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-blue-400">Development</p>
                    <p className="text-gray-400">Full Stack</p>
                    <p className="text-gray-400">System Architecture</p>
                    <p className="text-gray-400">Performance Optimization</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-400">Web3</p>
                    <p className="text-gray-400">Smart Contracts</p>
                    <p className="text-gray-400">dApp Development</p>
                    <p className="text-gray-400">Blockchain Integration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Technologies & Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Frontend */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">React.js</li>
                  <li className="text-gray-300">Next.js</li>
                  <li className="text-gray-300">TypeScript</li>
                  <li className="text-gray-300">Tailwind CSS</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Backend</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">Node.js</li>
                  <li className="text-gray-300">Python</li>
                  <li className="text-gray-300">Express.js</li>
                  <li className="text-gray-300">PostgreSQL</li>
                </ul>
              </div>

              {/* Web3 */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Web3</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">Solidity</li>
                  <li className="text-gray-300">Ethereum</li>
                  <li className="text-gray-300">Hardhat</li>
                  <li className="text-gray-300">Web3.js</li>
                </ul>
              </div>

              {/* Tools & Others */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-orange-400 mb-4">Tools & Others</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">Git</li>
                  <li className="text-gray-300">Docker</li>
                  <li className="text-gray-300">AWS</li>
                  <li className="text-gray-300">CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <Projects />
      </section>
      </main>
  )
}
