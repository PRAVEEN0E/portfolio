import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Navbar offset spacer */}
      <div className="absolute top-0 left-0 w-full h-16 sm:h-20"></div>
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-8 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-4 text-sm sm:text-base">
            Hello, World! I am
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-6">
            Praveen
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 min-h-[1.2em]">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'React Developer',
                2000,
                'Backend Engineer',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
            />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="mt-4 max-w-2xl text-base sm:text-xl text-gray-600 dark:text-gray-300 mx-auto mb-8 sm:mb-10 px-2">
            Passionate Full Stack Developer focused on building modern web applications and scalable backend systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center gap-3 sm:gap-4 flex-col sm:flex-row items-center"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-lg transition-all transform hover:-translate-y-1"
          >
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download="Praveen_Resume.pdf"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
          >
            <FaDownload size={14} />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
