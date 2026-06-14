import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-full"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src="/profile.png"
                alt="Praveen Eswaramoorthi - Full Stack Developer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Hello! I'm Praveen, a passionate Full Stack Developer.
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              I have a strong interest in web development and love building practical, user-centric projects. My journey in tech is driven by a deep curiosity for how things work and a desire to create impactful digital experiences.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              I thrive on tackling complex challenges and maintain a problem-solving mindset. Continuous learning is at the core of my approach, allowing me to stay updated with modern technologies and best practices.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <span className="block text-lg sm:text-2xl font-bold text-blue-600 mb-1">Passionate</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Developer</span>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <span className="block text-lg sm:text-2xl font-bold text-purple-600 mb-1">Problem</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Solver</span>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <span className="block text-lg sm:text-2xl font-bold text-pink-600 mb-1">Constant</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Learner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
