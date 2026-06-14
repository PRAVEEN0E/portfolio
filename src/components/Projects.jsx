import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const projects = [
    {
      id: "01",
      title: "Smart No-Due Clearance",
      description:
        "A web-based student clearance management system that streamlines the no-due process through digital approvals and status tracking.",
      tech: ["React", "Fastify", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/PRAVEEN0E/Smart_no_due_clearance",
      live: "https://smart-no-due-clearance.vercel.app/",
      featured: true,
    },
    {
      id: "02",
      title: "Product Management REST API",
      description:
        "A RESTful API supporting CRUD operations for managing products efficiently.",
      tech: ["Node.js", "Express.js"],
      github: "https://github.com/PRAVEEN0E/Rest_api",
      live: "https://productlist-api.onrender.com/",
      featured: false,
    },
  ];

  return (
    <section
      id="projects"
      className="py-28 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 uppercase tracking-[0.3em] text-sm">
            Portfolio
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Featured Projects
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in full-stack
            development and modern web technologies.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-4xl font-bold">2+</h3>
            <p className="text-gray-400 mt-2">Projects</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="text-gray-400 mt-2">Technologies</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-4xl font-bold">100%</h3>
            <p className="text-gray-400 mt-2">Responsive</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-8
                transition-all
                duration-300
                hover:border-blue-500/40
                ${
                  project.featured
                    ? "lg:col-span-2"
                    : ""
                }
              `}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-6xl font-bold text-white/10">
                  {project.id}
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                  Live
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-4 py-2
                      rounded-full
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      text-blue-400
                      text-sm
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-500
                    to-purple-600
                    hover:scale-105
                    transition-all
                  "
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    border
                    border-white/10
                    hover:bg-white/5
                    transition-all
                  "
                >
                  <FaGithub />
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;