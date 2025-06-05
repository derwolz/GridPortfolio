import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  colors: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="diagonal-card h-80 cursor-pointer group"
      variants={cardVariants}
      whileHover={{ 
        transition: { duration: 0.4 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="project-image"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="diagonal-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="text-primary text-sm font-mono mb-2 uppercase tracking-wide">{project.category}</div>
          <h3 className="text-3xl font-bold mb-3 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.technologies.map((tech, techIndex) => (
              <motion.span 
                key={tech}
                className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
