import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-1">
        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
          Copyright © 2026 Praveen
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex items-center gap-1 flex-wrap justify-center">
          Built with <span className="text-blue-500 font-semibold">React</span> and <span className="text-teal-400 font-semibold">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
