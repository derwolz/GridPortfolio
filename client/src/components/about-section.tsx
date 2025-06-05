import { motion } from "framer-motion";
import { Code, Server, Smartphone, Brain } from "lucide-react";

export default function AboutSection() {
  const skills = [
    { icon: Code, title: "Frontend", color: "text-blue-400" },
    { icon: Server, title: "Backend", color: "text-green-400" },
    { icon: Smartphone, title: "Mobile", color: "text-purple-400" },
    { icon: Brain, title: "AI/ML", color: "text-yellow-400" },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate developer and designer who loves creating innovative digital experiences. 
            With expertise across multiple technologies and a keen eye for design, I bring ideas to life 
            through clean code and compelling visuals.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <skill.icon className={`text-4xl ${skill.color} mb-4 mx-auto`} />
                <h3 className="font-semibold">{skill.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
