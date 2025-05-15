
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ value, label, suffix = "", delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(value * Math.min(progress, 1)));
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </p>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 70, label: "Premium Models", suffix: "+", delay: 0 },
    { value: 8, label: "Years Experience", suffix: "+", delay: 1 },
    { value: 12000, label: "Happy Customers", suffix: "+", delay: 2 },
    { value: 17, label: "Global Brands", suffix: "", delay: 3 }
  ];
  
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
