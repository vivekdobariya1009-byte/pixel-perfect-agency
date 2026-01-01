import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

export const TechBadge = ({ name, icon, delay = 0, className }: TechBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors duration-300",
        className
      )}
    >
      {icon && <span className="text-primary">{icon}</span>}
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay?: number;
}

export const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  company, 
  delay = 0 
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-foreground/90 leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div>
        <p className="font-semibold font-display">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role} at {company}
        </p>
      </div>
    </motion.div>
  );
};
