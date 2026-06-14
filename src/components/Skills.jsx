import React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
 
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
 
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: SiCss, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "Express", icon: SiExpress, color: "text-white" },

  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
  { name: "Git", icon: SiGit, color: "text-orange-500" },
  { name: "GitHub", icon: SiGithub, color: "text-white" },
  { name: "Postman", icon: SiPostman, color: "text-orange-400" },
  { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-purple-400 uppercase tracking-widest text-sm">
            My Stack
          </span>

          <h2 className="text-5xl font-bold mt-3">
            Technologies I Use
          </h2>

          <p className="text-gray-400 mt-4">
            Tools and technologies I use to build modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-6
                  flex flex-col
                  items-center
                  justify-center
                  gap-4
                  backdrop-blur-md
                  hover:border-purple-500/50
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <Icon
                  className={`
                    text-5xl
                    ${skill.color}
                    group-hover:scale-125
                    transition-transform
                    duration-300
                  `}
                />

                <h3 className="text-sm font-medium text-gray-300">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;