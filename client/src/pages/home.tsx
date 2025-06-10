import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Mail, Home as HomeIcon, ExternalLink, Menu, X  } from "lucide-react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("projects");
  const [viewingProject, setViewingProject] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [activatedProjects, setActivatedProjects] = useState<Set<string>>(new Set());

const [isUserScrolling, setIsUserScrolling] = useState(false);
const [featureScrollTop, setFeatureScrollTop] = useState(0);
const featureContainerRef = useRef(null);
const scrollTimeoutRef = useRef(null);
const animationRef = useRef(null);

 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const projects = [
    {
      id: "edison-ai",
      title: "EdisonAI",
      category: "AI • Machine Learning",
      description: "Advanced AI-powered platform for intelligent automation and decision-making processes.",
      fullDescription: "EdisonAI is a comprehensive AI platform that democratizes artificial intelligence development through an intuitive visual workflow builder. The company provides a no-code/low-code solution that enables users to create sophisticated AI systems using a drag-and-drop interface, making AI development accessible to non-technical users while maintaining the flexibility needed for complex implementations.",
      url:"https://edison-ai.com",
      image: "/assets/edisonaibg.png",
      charImage: "/assets/edisonaichar.png",
      technologies: ["ExpressJS","React", "PostgreSQL", "ChatGPT", "FireWorksAI", "Replicate"],
      features: ["Live Data Streaming", "Test Planning",  "Automated Workflows","UX/UI", "AI integrations"],
    },
    {
      id: "grey-pulse",
      title: "Grey Pulse",
      category: "Web App • Analytics",
      description: "Real-time analytics dashboard with advanced data visualization and monitoring capabilities.",
      fullDescription: "GreyPulse is pioneering the next generation of legal technology through advanced AI agents powered by large language models (LLMs). We're building intelligent legal assistants that don't just answer questions—they actively solve complex legal problems, automate workflows, and enhance the strategic capabilities of legal professionals.",
      url:"https://greypulse.io",
      charImage: "/assets/greypulsechar.png",
      image: "/assets/greypulsebg.png",

      technologies: ["React", "ExpressJS", "WebSockets", "MongoDB"],
      features: ["Automation", "Bot Building", "Integrations", "Website Design", "Decision Tree Creation"],
    },
    {
      id: "valkyrie-x-truck",
      title: "Valkyrie X Truck",
      category: "Web App • Book",
      description: "Book Website",
      fullDescription: "Promotional website for the upcoming novel \"Valkyrie X Truck,\" creating an immersive digital experience that captures the book's unique blend of anime and modern aesthetics.",
      image: "/assets/valkyriebg.png",
      charImage: "/assets/valkyriechar.png",
      url:"https://valkyriextruck.com",
      technologies: ["Svelte", "ComfyUI", "MdSvex", "Ngnix" ],
      features: [
        "Marketing", "Writing", "Copywrite", "Image Generation", "Video Generation"
      ],
    },
    {
      id: "sirened",
      title: "Sirened",
      category: "Web App • Analytics",
      description: "Book Recommendation service.",
      fullDescription: "Sirened is a book discovery marketplace that serves as a centralized hub where authors can showcase their books and direct readers to their personal websites. The platform functions as a sophisticated book directory with integrated analytics, allowing authors to list their works, track visitor engagement, and monitor referral traffic to their sites. Built to bridge the gap between readers seeking new books and authors looking to expand their audience, Sirened provides valuable insights into book discovery patterns and reader behavior through comprehensive analytics dashboards.",
      image: "/assets/sirenedbg.jpeg",
      charImage: "/assets/sirenedchar.png",
      github: "https://github.com/stankysite",
      url: "https://sirened.com",
       technologies: ["React", "PostgreSQL", "Chart.js", "Semantic Analysis", "Topic Analysis"  ],
      features: [
    "Custom Author Dashboards", 
    "Interactive Reader Metrics",
    "Book Performance Tracking",
    "Reader Engagement Insights",
    "Genre Trend Analysis",
    "Reporting Tools",
    "Author Portfolio Management"
  ],
    }
  ];

  const menuItems = [
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
  const handleMenuItemClick = (itemId) => {
    setActiveSection(itemId);
    setViewingProject(null);
    if (!hasStarted) setHasStarted(true);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };
  const handleResumeDownload = () =>{
    const newTab = window.open('/assets/Blaine Wolz Resume.pdf', '_blank');
    console.log(newTab)
    if (newTab) {
      newTab.focus(); // Focuses the new tab if popup blockers don't interfere
    }
  }
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
                  animate={{ opacity: 1, y: index % 2 === 0 ? 0 : 60, x: index % 2 === 0 ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="slot-background">
                    <AnimatePresence>
                      {(selectedProject === project.id || activatedProjects.has(project.id)) && (
                        <motion.div
                          className="project-image-overlay"
                          style={{ backgroundImage: `url(/assets/bg${index}.png)`  }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="slot-content">
                    <div className="slot-image">
                      {(selectedProject === project.id || activatedProjects.has(project.id)) ? 
                      <img className="char-image" src={`${project.charImage}`} alt={`${project.description}`}/>
                      : null}
                    </div>
                    {
                      (selectedProject === project.id || activatedProjects.has(project.id)) 
                      ? 
                    <div className="slot-text">
                      <div className="slot-label">
                            {project.category}
                      </div>
                      <div className="slot-number">
                        {project.title}
                      </div>
                    </div>


                      :
                        <>
                      <div className="">
                          Click
                      </div>
                      <div className="slot-action">
                                TO JOIN
                        
                      </div>

                      </>
                    }
                  </div>
                </motion.div>
              ))}
              
              {/* Coming soon slots */}
              {[0].map((slot) => (
                <motion.div
                  key={`coming-${slot}`}
                  className="project-slot opacity-60"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 0.6, y: slot % 2 === 0 ? 0 : 60, x: slot % 2 === 0 ? 0: -20 }}
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
              <h1 className="text-5xl font-bold mb-6">Product Developer</h1>
              <p className="text-xl text-gray-300 mb-8">
                Passionate developer and creator crafting innovative digital experiences across multiple technologies.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["Full Stack", "Design", "Innovation", "Analysis"].map((skill) => (
                  <div key={skill} className="bg-black/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-primary font-semibold">{skill}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {["Bachelor's CS", "ITIL IV", "Project+", "MBA"].map((skill) => (
                  <div key={skill} className="bg-white/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-black/90 font-semibold">{skill}</div>
                  </div>
                ))}
              </div>
           <div className="mt-6 ">
                {["Download Resume"].map((skill) => (
                  <button onClick={handleResumeDownload} key={skill} className="w-full bg-black/50 hover:bg-black/70 p-4 rounded-lg border border-gray-700">
                    <span className="text-primary font-semibold">{skill}</span>
                  </button>
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
                  <div className="text-primary">der.wolz@gmail.com</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-primary">Baker City, Or</div>
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

    const startAutoScroll = () => {
      if (isUserScrolling || !featureContainerRef.current) return;

      const scroll = () => {
        if (isUserScrolling) return;
        
        setFeatureScrollTop(prev => {
          const container = featureContainerRef.current;
          if (!container) return prev;
          
          const itemHeight = container.scrollHeight / container.children.length;
          const maxScroll = itemHeight * (container.children.length / 2); // Half because we duplicate
          
          let newScrollTop = prev + 0.5; // Adjust speed here (pixels per frame)
          
          // Reset to top when we've scrolled past the original items
          if (newScrollTop >= maxScroll) {
            newScrollTop = 0;
          }
          
          container.scrollTop = newScrollTop;
          return newScrollTop;
        });
        
        animationRef.current = requestAnimationFrame(scroll);
      };
      
      animationRef.current = requestAnimationFrame(scroll);
    };

    const stopAutoScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleFeatureMouseEnter = () => {
      setIsUserScrolling(true);
      stopAutoScroll();
    };

    const handleFeatureMouseLeave = () => {
      setIsUserScrolling(false);
      // Small delay before restarting auto-scroll
      scrollTimeoutRef.current = setTimeout(() => {
        startAutoScroll();
      }, 500);
    };

    const handleFeatureScroll = (e) => {
      if (!isUserScrolling) return;
      
      // Clear any pending restart timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Update our tracked scroll position when user scrolls
      setFeatureScrollTop(e.target.scrollTop);
    };

    // 4. ADD THIS useEffect AFTER YOUR EXISTING useEffect (around line 115)
    useEffect(() => {
      if (viewingProject) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
      
      return () => {
        stopAutoScroll();
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [viewingProject, isUserScrolling]);

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
                style={{backgroundImage: `url(${currentProject.image})`}}
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
                  <a href={`${currentProject.url}`}><span className="web-link">Visit The Website <ExternalLink/></span></a>
                  <div className="project-features">
                    <h3>Key Features</h3>
                    <ul 
                      ref={featureContainerRef}
                      className="key-features"
                      onMouseEnter={handleFeatureMouseEnter}
                      onMouseLeave={handleFeatureMouseLeave}
                      onScroll={handleFeatureScroll}
                    >
                     {isUserScrolling 
      ? currentProject.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))
      : [...currentProject.features, ...currentProject.features].map((feature, index) => (
          <li key={index}>{feature}</li>
        ))
    }
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
        {(
          <motion.nav 
            className="bottom-menu flex flex-row justify-between"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="pl-8 name-div text-xl font-bold  ">
              <span>Blaine Wolz</span>
            </div>
            <div className="menu-container">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                      setActiveSection(item.id);
                      setViewingProject(null);
                      if (!hasStarted) setHasStarted(true);
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
            <div className="w-[11ch]"></div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Mobile Hamburger Button */}
      <motion.button
        className="hamburger-button mobile-only"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>
 {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.nav
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                <h2 className="text-xl font-bold text-white">Portfolio Blaine Wolz</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="close-button"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mobile-menu-items">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`mobile-menu-button ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="mobile-menu-icon" size={24} />
                    <span className="mobile-menu-label">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
