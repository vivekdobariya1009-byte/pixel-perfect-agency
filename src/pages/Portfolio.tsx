import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';

type Category = 'All' | 'Web' | 'Mobile' | 'UI/UX' | 'E-commerce';

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  technologies: string[];
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.',
    category: 'E-commerce',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'Healthcare App',
    description: 'Mobile application for appointment booking, telemedicine, and health record management.',
    category: 'Mobile',
    technologies: ['React Native', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 3,
    title: 'Corporate Website',
    description: 'Modern corporate website with CMS integration, blog, and lead generation forms.',
    category: 'Web',
    technologies: ['React', 'Tailwind CSS', 'Strapi'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'Banking Dashboard',
    description: 'Intuitive dashboard design for a fintech startup with real-time data visualization.',
    category: 'UI/UX',
    technologies: ['Figma', 'React', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 5,
    title: 'Food Delivery App',
    description: 'Cross-platform food delivery application with real-time tracking and payment integration.',
    category: 'Mobile',
    technologies: ['Flutter', 'Firebase', 'Google Maps'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 6,
    title: 'Learning Management System',
    description: 'Comprehensive LMS with video streaming, quizzes, and progress tracking.',
    category: 'Web',
    technologies: ['Next.js', 'Node.js', 'AWS', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

const categories: Category[] = ['All', 'Web', 'Mobile', 'UI/UX', 'E-commerce'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Projects That{' '}
              <span className="gradient-text">Speak for Themselves</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our portfolio of successful projects across various industries. 
              Each project represents our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Section>
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold font-display mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-secondary/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl bg-card border border-border/50 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-40`} />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {selectedProject.description}
                </p>

                <h4 className="font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary/50 border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Start Similar Project
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's turn your vision into reality. Our team is ready to bring your ideas to life.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Start Your Project
              <ExternalLink className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Portfolio;
