import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Mail, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [viewingProject, setViewingProject] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [activatedProjects, setActivatedProjects] = useState<Set<string>>(new Set());

  const projects = [
    {
      id: "edison-ai",
      title: "EdisonAI",
      category: "AI • Machine Learning",
      description: "Advanced AI-powered platform for intelligent automation and decision-making processes.",
      fullDescription: "EdisonAI represents the cutting edge of artificial intelligence and machine learning technology. This comprehensive platform provides businesses with intelligent automation capabilities, predictive analytics, and decision-making tools that revolutionize how organizations operate. Built with scalability in mind, EdisonAI processes vast amounts of data in real-time, delivering actionable insights that drive growth and efficiency.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Python", "TensorFlow", "React", "Docker", "AWS", "PostgreSQL"],
      features: ["Real-time Analytics", "Predictive Modeling", "Automated Workflows", "Custom AI Models"],
    },
    {
      id: "grey-pulse",
      title: "Grey Pulse",
      category: "Web App • Analytics",
      description: "Real-time analytics dashboard with advanced data visualization and monitoring capabilities.",
      fullDescription: "Grey Pulse is a sophisticated analytics platform that transforms raw data into beautiful, actionable insights. With its intuitive dashboard interface and powerful visualization engine, users can monitor key metrics, track performance trends, and make data-driven decisions with confidence. The platform supports real-time data streaming and offers customizable widgets for different business needs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Vue.js", "Node.js", "D3.js", "WebSocket", "MongoDB", "Redis"],
      features: ["Live Data Streaming", "Custom Dashboards", "Interactive Charts", "Export Capabilities"],
    },
    {
      id: "valkyrie-x-truck",
      title: "Valkyrie X Truck",
      category: "Design • 3D Modeling",
      description: "Futuristic truck design concept featuring advanced aerodynamics and sustainable technology.",
      fullDescription: "The Valkyrie X Truck represents the future of sustainable transportation. This revolutionary design concept combines cutting-edge aerodynamics with eco-friendly technology to create a vehicle that's both visually striking and environmentally conscious. Every curve and surface has been meticulously crafted to reduce drag while maintaining the rugged functionality expected from commercial vehicles.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Blender", "AutoCAD", "3D Design", "Photoshop", "KeyShot"],
      features: ["Aerodynamic Design", "Sustainable Materials", "Autonomous Capabilities", "Electric Powertrain"],
    },
    {
      id: "sirened",
      title: "Sirened",
      category: "Audio • Mobile App",
      description: "Advanced audio processing platform with real-time sound manipulation and effects.",
      fullDescription: "Sirened is a revolutionary audio processing application that puts professional-grade sound manipulation tools in the palm of your hand. Whether you're a music producer, sound designer, or audio enthusiast, Sirened provides an extensive suite of real-time effects and processing capabilities that were previously only available in expensive studio equipment.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["React Native", "Web Audio API", "DSP", "Core Audio", "FFT"],
      features: ["Real-time Effects", "Multi-track Recording", "Cloud Sync", "Professional Export"],
    }
  ];

  const menuItems = [
    { id: "home", label: "HOME", icon: HomeIcon },
    { id: "projects", label: "PROJECTS", icon: Code },
    { id: "about", label: "ABOUT", icon: User },
    { id: "contact", label: "CONTACT", icon: Mail },
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!hasStarted) {
        setHasStarted(true);
        setActiveSection("projects");
      }
    };

    const handleClick = (event: MouseEvent) => {
      // Don't activate if clicking on a button element
      if (!hasStarted && !(event.target as Element)?.closest('button')) {
        setHasStarted(true);
        setActiveSection("projects");
      }
    };

    if (!hasStarted) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [hasStarted]);

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return (
          <div className="projects-container">
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`project-slot ${activatedProjects.has(project.id) ? 'activated' : ''}`}
                  onHoverStart={() => {
                    // Only trigger hover on non-touch devices
                    if (window.matchMedia('(hover: hover)').matches) {
                      setSelectedProject(project.id);
                    }
                  }}
                  onHoverEnd={() => {
                    if (window.matchMedia('(hover: hover)').matches) {
                      setSelectedProject(null);
                    }
                  }}
                  onTap={() => {
                    // For touch devices, briefly show preview before opening
                    if (!window.matchMedia('(hover: hover)').matches) {
                      setSelectedProject(project.id);
                      setTimeout(() => setSelectedProject(null), 200);
                    }
                  }}
                  onClick={() => {
                    setViewingProject(project.id);
                    setActivatedProjects(prev => {
                      const newSet = new Set(prev);
                      newSet.add(project.id);
                      return newSet;
                    });
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="slot-background">
                    <AnimatePresence>
                      {(selectedProject === project.id || activatedProjects.has(project.id)) && (
                        <motion.div
                          className="project-image-overlay"
                          style={{ backgroundImage: `url(${project.image})` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="slot-content">
                    <div className="slot-label">
                      {(selectedProject === project.id || activatedProjects.has(project.id)) ? project.category : "PRESS"}
                    </div>
                    <div className="slot-number">
                      {(selectedProject === project.id || activatedProjects.has(project.id)) ? project.title : "O"}
                    </div>
                    <div className="slot-action">
                      {activatedProjects.has(project.id) 
                        ? (selectedProject === project.id ? "CLICK TO VIEW" : "CLICK TO VIEW")
                        : (selectedProject === project.id ? "CLICK TO VIEW" : "TO JOIN")
                      }
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Coming soon slots */}
              {[1, 2].map((slot) => (
                <motion.div
                  key={`coming-${slot}`}
                  className="project-slot opacity-60"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ duration: 0.5, delay: (projects.length + slot - 1) * 0.1 }}
                >
                  <div className="slot-background" />
                  <div className="slot-content">
                    <div className="slot-label">COMING</div>
                    <div className="slot-number">SOON</div>
                    <div className="slot-action">STAY TUNED</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case "about":
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div 
              className="text-center max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold mb-6">Creative Developer</h1>
              <p className="text-xl text-gray-300 mb-8">
                Passionate developer and designer creating innovative digital experiences across multiple technologies.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["Frontend", "Backend", "Mobile", "AI/ML"].map((skill) => (
                  <div key={skill} className="bg-black/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-primary font-semibold">{skill}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      
      case "contact":
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div 
              className="text-center max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-gray-300 mb-8">
                Ready to collaborate? Let's build something amazing together.
              </p>
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-primary">hello@portfolio.dev</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-primary">+1 (555) 123-4567</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-primary">San Francisco, CA</div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      
      default:
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            {!hasStarted ? (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.h1 
                  className="massive-title mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  PORTFOLIO
                </motion.h1>
                <motion.p 
                  className="start-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7, 1] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  PRESS ANY BUTTON TO START
                </motion.p>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-6xl font-bold mb-4">Welcome</h1>
                <p className="text-2xl text-gray-300">Select a section from the menu below</p>
              </motion.div>
            )}
          </div>
        );
    }
  };

  const currentProject = viewingProject ? projects.find(p => p.id === viewingProject) : null;

  return (
    <div className="gaming-interface">
      {/* Main content area */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Project Detail View */}
      <AnimatePresence>
        {viewingProject && currentProject && (
          <>
            {/* Dim overlay */}
            <motion.div
              className="project-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setViewingProject(null)}
            />
            
            {/* Project detail panel */}
            <motion.div
              className="project-detail-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div 
                className="project-background"
                style={{ backgroundImage: `url(${currentProject.image})` }}
              />
              <div className="project-detail-content">
                <button
                  className="close-button"
                  onClick={() => setViewingProject(null)}
                >
                  ×
                </button>
                
                <div className="project-info">
                  <div className="project-category">{currentProject.category}</div>
                  <h1 className="project-title">{currentProject.title}</h1>
                  <p className="project-full-description">{currentProject.fullDescription}</p>
                  
                  <div className="project-features">
                    <h3>Key Features</h3>
                    <ul>
                      {currentProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="project-technologies">
                    <h3>Technologies Used</h3>
                    <div className="tech-tags">
                      {currentProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom gaming menu */}
      <AnimatePresence>
        {hasStarted && (
          <motion.nav 
            className="bottom-menu"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="menu-container">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    if (item.id === "home") {
                      setHasStarted(false);
                      setActiveSection("home");
                      setViewingProject(null);
                    } else {
                      setActiveSection(item.id);
                      setViewingProject(null);
                      if (!hasStarted) setHasStarted(true);
                    }
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="menu-icon" size={20} />
                  <span className="menu-label">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
