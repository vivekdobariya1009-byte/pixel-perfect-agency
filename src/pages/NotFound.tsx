import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-8xl md:text-9xl font-bold font-display gradient-text mb-6">404</div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
          <Button asChild variant="hero" size="lg">
            <Link to="/"><Home className="w-5 h-5" />Go Home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
