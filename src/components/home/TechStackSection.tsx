import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/section';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express', icon: '🚀' },
  { name: 'NestJS', icon: '🐱' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Git', icon: '📦' },
];

export const TechStackSection = () => {
  return (
    <Section className="bg-card/30 overflow-hidden">
      <SectionHeader
        badge="Our Tech Stack"
        title="Technologies We Master"
        description="We leverage industry-leading technologies to build robust, scalable, and performant solutions."
      />
      
      {/* Animated Tech Grid */}
      <div className="relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="text-3xl md:text-4xl mb-3">{tech.icon}</div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-t from-primary/10 to-transparent blur-3xl pointer-events-none" />
      </div>
    </Section>
  );
};
