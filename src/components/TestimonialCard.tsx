
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  testimonial: string;
  avatarSrc?: string;
  rating: number;
  delay?: number;
}

const TestimonialCard = ({ 
  name, 
  position, 
  testimonial, 
  avatarSrc, 
  rating,
  delay = 0 
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardContent className="pt-6 pb-4">
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <p className="mb-6 text-foreground/80 italic">{testimonial}</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{position}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
