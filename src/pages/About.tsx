import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/section';
import { 
  Target, 
  Eye, 
  Heart, 
  Award,
  Users,
  Lightbulb,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We prioritize understanding and meeting your unique needs.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards of quality in every project we undertake.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in transparent communication and working together as partners.',
  },
];

const timeline = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Started with a vision to bridge the gap between technology and businesses.',
  },
  {
    year: '2020',
    title: 'Training Launch',
    description: 'Launched our comprehensive IT training programs for aspiring developers.',
  },
  {
    year: '2021',
    title: '100+ Projects',
    description: 'Celebrated delivering over 100 successful projects across various industries.',
  },
  {
    year: '2022',
    title: 'Team Expansion',
    description: 'Grew our team to include specialized experts in different technology domains.',
  },
  {
    year: '2023',
    title: 'Remote Training',
    description: 'Expanded training programs to serve students from across the country.',
  },
];

const team = [
  {
    name: 'Vikram Mehta',
    role: 'Founder & CEO',
    bio: 'Full-stack developer with 10+ years of experience in building scalable web applications.',
  },
  {
    name: 'Anita Verma',
    role: 'Head of Training',
    bio: 'Passionate educator dedicated to helping students achieve their career goals in tech.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Lead Developer',
    bio: 'Expert in React, Node.js, and cloud architecture with a focus on performance optimization.',
  },
  {
    name: 'Meera Singh',
    role: 'UI/UX Lead',
    bio: 'Creative designer who transforms complex problems into intuitive user experiences.',
  },
];

const About = () => {
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Empowering Businesses Through{' '}
              <span className="gradient-text">Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We are a team of passionate developers, designers, and trainers committed 
              to delivering exceptional IT solutions and nurturing the next generation of tech talent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section className="bg-card/30">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border/50"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower businesses and individuals with innovative technology solutions and 
              world-class training that enables them to achieve their goals and thrive in the 
              digital economy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border/50"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the leading IT solutions and training provider, recognized for our 
              commitment to excellence, innovation, and the success of our clients and students.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          badge="Our Values"
          title="What Drives Us"
          description="These core values guide everything we do and define who we are as a company."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-card/30">
        <SectionHeader
          badge="Our Journey"
          title="How We Got Here"
          description="From a small startup to a trusted technology partner — here's our story."
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              
              <span className="inline-block px-3 py-1 mb-2 text-sm font-bold rounded-full bg-primary/10 text-primary">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold font-display mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section id="team">
        <SectionHeader
          badge="Our Team"
          title="Meet the Experts"
          description="A passionate team of professionals dedicated to your success."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl font-bold font-display gradient-text">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-display mb-1">{member.name}</h3>
              <p className="text-sm text-primary mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100+', label: 'Projects Completed' },
            { value: '50+', label: 'Happy Clients' },
            { value: '500+', label: 'Students Trained' },
            { value: '99%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold font-display gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default About;
