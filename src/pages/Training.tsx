import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Code2, 
  Users, 
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Server,
  Database,
  Laptop,
  Award,
  Target
} from 'lucide-react';

const courseFeatures = [
  {
    icon: Clock,
    title: 'Full-Time Training',
    description: 'Immersive, full-time program with dedicated learning hours.',
  },
  {
    icon: Code2,
    title: '100% Practical',
    description: 'Hands-on coding from day one with real-world projects.',
  },
  {
    icon: Briefcase,
    title: 'Live Projects',
    description: 'Work on actual client projects to build your portfolio.',
  },
  {
    icon: Users,
    title: 'Interview Prep',
    description: 'Mock interviews and resume building with industry experts.',
  },
  {
    icon: Laptop,
    title: 'Remote Friendly',
    description: 'Learn from anywhere with our online training options.',
  },
  {
    icon: Award,
    title: 'Job Guidance',
    description: 'Career counseling and job placement assistance.',
  },
];

const curriculum = [
  {
    module: 'Frontend Development',
    icon: Monitor,
    duration: '6 Weeks',
    topics: [
      'HTML5, CSS3, JavaScript ES6+',
      'React.js Fundamentals & Hooks',
      'State Management (Context, Redux)',
      'Tailwind CSS & Styled Components',
      'TypeScript for React',
      'Next.js Framework',
    ],
  },
  {
    module: 'Backend Development',
    icon: Server,
    duration: '6 Weeks',
    topics: [
      'Node.js & Express.js',
      'RESTful API Design',
      'Authentication & Authorization',
      'NestJS Framework',
      'GraphQL Basics',
      'Real-time with Socket.io',
    ],
  },
  {
    module: 'Database & DevOps',
    icon: Database,
    duration: '4 Weeks',
    topics: [
      'MongoDB & Mongoose',
      'PostgreSQL & Prisma',
      'Git & GitHub Workflow',
      'Docker Fundamentals',
      'CI/CD Pipelines',
      'Cloud Deployment (AWS)',
    ],
  },
];

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '95%', label: 'Placement Rate' },
  { value: '50+', label: 'Hiring Partners' },
  { value: '₹8 LPA', label: 'Avg. Starting Salary' },
];

const Training = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                IT Training Programs
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                Launch Your Career in{' '}
                <span className="gradient-text">Full-Stack Development</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Master modern web technologies with our industry-focused training program. 
                Get job-ready in 16 weeks with hands-on projects and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contact">
                    Enroll Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link to="/contact">
                    Download Syllabus
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section className="bg-card/30">
        <SectionHeader
          badge="Why Choose Us"
          title="What Makes Our Training Different"
          description="Our program is designed to give you the practical skills employers are looking for."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Curriculum */}
      <Section>
        <SectionHeader
          badge="Curriculum"
          title="What You'll Learn"
          description="A comprehensive curriculum covering everything you need to become a full-stack developer."
        />
        <div className="grid lg:grid-cols-3 gap-6">
          {curriculum.map((module, index) => (
            <motion.div
              key={module.module}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <module.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-display">{module.module}</h3>
                  <span className="text-sm text-primary">{module.duration}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Technologies */}
      <Section className="bg-card/30">
        <SectionHeader
          badge="Technologies"
          title="Master In-Demand Technologies"
          description="Learn the tools and technologies used by top tech companies worldwide."
        />
        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'Next.js', 'Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Docker', 'Git', 'AWS'].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <span className="font-medium">{tech}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Ready to Start Your Developer Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our next batch and transform your career with industry-relevant skills 
            and hands-on experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/contact">
                Schedule a Call
              </Link>
            </Button>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Training;
