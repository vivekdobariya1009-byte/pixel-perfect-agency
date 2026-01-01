import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services does Shunyek Infotech offer?',
    answer: 'We offer comprehensive IT services including Web Development, Mobile App Development, UI/UX Design, Custom Software Development, and IT Training programs. Our solutions are tailored to meet the unique needs of each client.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in modern web technologies including React, Next.js, Node.js, Express, NestJS, MongoDB, PostgreSQL, TypeScript, and Tailwind CSS. We also work with cloud platforms like AWS and use Docker for containerization.',
  },
  {
    question: 'How long does the Full-Stack Development training program last?',
    answer: 'Our comprehensive Full-Stack Development training program is designed to provide hands-on experience with real projects. The duration varies based on the batch type - full-time intensive programs typically run for 3-4 months, while part-time programs can extend to 6 months.',
  },
  {
    question: 'Do you provide placement assistance after training?',
    answer: 'Yes! We provide complete placement assistance including resume building, interview preparation, mock interviews, and connections with our network of hiring partners. We also offer guidance for remote job opportunities.',
  },
  {
    question: 'What is the typical timeline for a web development project?',
    answer: 'Project timelines vary based on complexity. A simple website can be delivered in 2-4 weeks, while complex web applications may take 2-4 months. We provide detailed project timelines during our initial consultation.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Absolutely! We offer comprehensive post-project support and maintenance packages to ensure your applications run smoothly. This includes bug fixes, security updates, feature enhancements, and technical support.',
  },
  {
    question: 'Can you work with clients remotely?',
    answer: 'Yes, we work with clients across India and internationally. We use modern collaboration tools for seamless communication and project management, ensuring quality delivery regardless of location.',
  },
  {
    question: 'How can I get a quote for my project?',
    answer: 'You can reach out to us through our contact form, email us at info@shunyekinfotech.in, or visit our office. We\'ll schedule a consultation to understand your requirements and provide a detailed proposal.',
  },
];

export const FAQSection = () => {
  return (
    <Section className="bg-secondary/30">
      <SectionHeader
        badge="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services and training programs."
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-2xl border border-border/50 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
};