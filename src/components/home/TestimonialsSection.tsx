import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/section';
import { TestimonialCard } from '@/components/ui/tech-badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Shunyekinfotech transformed our outdated website into a modern, high-performing platform. Their attention to detail and technical expertise is outstanding.",
    author: "Rajesh Patel",
    role: "CEO",
    company: "TechVentures India",
  },
  {
    quote: "The training program was exceptional. I went from zero coding knowledge to landing my first developer job in just 6 months. Highly recommended!",
    author: "Priya Sharma",
    role: "Full Stack Developer",
    company: "StartupHub",
  },
  {
    quote: "Professional, responsive, and incredibly skilled. They delivered our e-commerce platform ahead of schedule and exceeded all expectations.",
    author: "Amit Kumar",
    role: "Founder",
    company: "ShopEasy",
  },
  {
    quote: "Their custom software solution streamlined our operations and saved us countless hours. The ROI has been phenomenal.",
    author: "Sneha Desai",
    role: "Operations Manager",
    company: "LogiTech Solutions",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <Section>
      <SectionHeader
        badge="Testimonials"
        title="What Our Clients Say"
        description="Don't just take our word for it. Here's what our clients and students have to say about working with us."
      />
      
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Section>
  );
};
