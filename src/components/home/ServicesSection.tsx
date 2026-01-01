import { Section, SectionHeader } from '@/components/ui/section';
import { ServiceCard } from '@/components/ui/service-card';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  GraduationCap, 
  Code2, 
  Server 
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with React, Next.js, and modern technologies for optimal performance.',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality to create engaging digital experiences.',
  },
  {
    icon: GraduationCap,
    title: 'IT Training',
    description: 'Comprehensive training programs covering full-stack development, practical projects, and interview preparation.',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored software solutions designed to streamline your business processes and drive growth.',
  },
  {
    icon: Server,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps services to ensure your applications run smoothly.',
  },
];

export const ServicesSection = () => {
  return (
    <Section className="bg-card/30">
      <SectionHeader
        badge="Our Services"
        title="Solutions That Drive Results"
        description="We offer comprehensive IT services tailored to meet your business needs and help you stay ahead in the digital landscape."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </Section>
  );
};
