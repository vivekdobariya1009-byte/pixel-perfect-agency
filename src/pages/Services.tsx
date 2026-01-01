import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  GraduationCap, 
  Code2, 
  Server,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    features: [
      'Responsive design for all devices',
      'Fast-loading, SEO-optimized websites',
      'E-commerce solutions',
      'Content management systems',
      'Progressive Web Apps (PWA)',
      'API integrations',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: [
      'Native iOS & Android apps',
      'Cross-platform development',
      'UI/UX optimized for mobile',
      'Push notifications',
      'Offline functionality',
      'App store optimization',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Visual design systems',
      'Interaction design',
      'Usability testing',
      'Design handoff',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
  },
  {
    icon: GraduationCap,
    title: 'IT Training',
    description: 'Comprehensive training programs for aspiring developers.',
    features: [
      'Full-stack development courses',
      '100% practical, project-based',
      'Industry-relevant curriculum',
      'Interview preparation',
      'Career guidance',
      'Job placement support',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'NestJS'],
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored software solutions for your unique business needs.',
    features: [
      'Business process automation',
      'Enterprise resource planning',
      'CRM development',
      'Inventory management',
      'Reporting & analytics',
      'Legacy system modernization',
    ],
    technologies: ['Node.js', 'Python', '.NET', 'PostgreSQL', 'Redis'],
  },
  {
    icon: Server,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps services.',
    features: [
      'Cloud architecture design',
      'AWS/GCP/Azure deployment',
      'CI/CD pipeline setup',
      'Container orchestration',
      'Monitoring & logging',
      '24/7 infrastructure support',
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Comprehensive IT Solutions for{' '}
              <span className="gradient-text">Your Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              From web development to IT training, we offer a complete range of services 
              to help you succeed in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-secondary/50 border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-8 md:p-12 flex items-center justify-center">
                  <service.icon className="w-32 h-32 md:w-48 md:h-48 text-primary/20" />
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/10 blur-xl" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-accent/10 blur-xl" />
                </div>
              </div>
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
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can help you achieve your business goals with our 
            comprehensive IT solutions.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Services;
