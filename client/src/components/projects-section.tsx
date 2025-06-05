import { motion } from "framer-motion";
import ProjectCard from "./project-card";

export default function ProjectsSection() {
  const projects = [
    {
      id: "edison-ai",
      title: "EdisonAI",
      category: "AI • Machine Learning",
      description: "Advanced AI-powered platform for intelligent automation and decision-making processes.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Python", "TensorFlow", "React"],
      colors: ["bg-blue-600/20 text-blue-400"]
    },
    {
      id: "grey-pulse",
      title: "Grey Pulse",
      category: "Web App • Analytics",
      description: "Real-time analytics dashboard with advanced data visualization and monitoring capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Vue.js", "Node.js", "D3.js"],
      colors: ["bg-green-600/20 text-green-400"]
    },
    {
      id: "valkyrie-x-truck",
      title: "Valkyrie X Truck",
      category: "Design • 3D Modeling",
      description: "Futuristic truck design concept featuring advanced aerodynamics and sustainable technology.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Blender", "AutoCAD", "3D Design"],
      colors: ["bg-purple-600/20 text-purple-400"]
    },
    {
      id: "sirened",
      title: "Sirened",
      category: "Audio • Mobile App",
      description: "Advanced audio processing platform with real-time sound manipulation and effects.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["React Native", "Web Audio API", "DSP"],
      colors: ["bg-orange-600/20 text-orange-400"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work across different technologies and creative domains
          </p>
        </motion.div>

        <motion.div 
          className="diagonal-grid max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          
          {/* Future project slots */}
          {[1, 2].map((slot) => (
            <motion.div 
              key={slot} 
              className="diagonal-card h-80 opacity-60"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + (slot * 0.1) }}
              viewport={{ once: true }}
            >
              <div className="diagonal-content">
                <div className="text-muted-foreground text-sm font-mono mb-2 uppercase tracking-wide">Coming Soon</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {slot === 1 ? "New Project" : "Future Project"}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {slot === 1 
                    ? "Exciting new project in development. Stay tuned for updates."
                    : "Another innovative project currently in the planning phase."
                  }
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-muted-foreground/20 text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">TBD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
