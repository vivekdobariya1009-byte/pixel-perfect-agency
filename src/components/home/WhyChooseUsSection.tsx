import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/section';
import { CheckCircle2, Target, Zap, Users, Shield, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Result-Driven Approach',
    description: 'We focus on delivering measurable outcomes that align with your business objectives.',
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    description: 'We use the latest tools and frameworks to build future-proof solutions.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team of skilled developers and designers brings years of industry experience.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous testing and code reviews ensure robust, bug-free deliverables.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team available round the clock to assist you.',
  },
  {
    icon: CheckCircle2,
    title: 'On-Time Delivery',
    description: 'We respect deadlines and deliver projects within the agreed timeframe.',
  },
];

export const WhyChooseUsSection = () => {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
          >
            Your Success Is{' '}
            <span className="gradient-text">Our Priority</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            We combine technical expertise with a deep understanding of business needs 
            to deliver solutions that truly make a difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {['React', 'Node.js', 'MongoDB', 'Next.js', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium rounded-full bg-secondary/50 border border-border/50"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold font-display mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
