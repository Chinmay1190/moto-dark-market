
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle, Star, Award, Sparkles } from "lucide-react";

const SuccessPage = () => {
  const [showBike, setShowBike] = useState(false);
  
  useEffect(() => {
    // Show toast notification
    toast({
      title: "Order Successful!",
      description: "Your superbike order has been placed successfully.",
    });
    
    // Trigger initial confetti burst
    const end = Date.now() + 1 * 1000;
    const colors = ["#00bb00", "#26ccff", "#a25afd", "#ff5e7e", "#88ff5a"];
    
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    
    // Show the bike animation after the initial confetti
    setTimeout(() => {
      setShowBike(true);
      
      // Additional confetti effect after bike appears
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 600);
    }, 800);
    
    // Continuous smaller confetti animation
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(confettiInterval);
        return;
      }
      
      // Launch confetti from both sides
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 }
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 }
      });
    }, 250);
    
    return () => clearInterval(confettiInterval);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const bikeVariants = {
    hidden: { x: -1000, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8
      }
    }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      transition: { 
        duration: 8,
        repeat: Infinity,
        ease: "linear" 
      }
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-16 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md w-full text-center">
        <motion.div 
          className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-8"
          variants={pulseVariants}
          animate="pulse"
        >
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold mb-4"
          variants={itemVariants}
        >
          Order Successful!
        </motion.h1>
        
        <motion.div 
          className="space-y-4 mb-8"
          variants={itemVariants}
        >
          <p className="text-lg">
            Thank you for your purchase! Your superbike order has been placed successfully.
          </p>
          
          {showBike && (
            <motion.div 
              className="my-6 py-4"
              variants={bikeVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative h-12 w-full">
                <motion.div 
                  className="absolute left-0"
                  animate={{
                    x: ["0%", "100%", "0%"],
                    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  🏍️
                </motion.div>
                <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-700 mt-8"></div>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="bg-muted/40 p-4 rounded-lg relative overflow-hidden"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute top-2 right-2 text-yellow-500"
              variants={sparkleVariants}
              animate="animate"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            
            <p className="text-sm text-muted-foreground mb-2">
              An email confirmation has been sent to your registered email address.
            </p>
            <p className="text-sm text-muted-foreground">
              Your order ID: <span className="font-medium">#SB{Math.floor(Math.random() * 900000) + 100000}</span>
            </p>
            
            <motion.div 
              className="absolute -bottom-2 -left-2 text-blue-500"
              variants={sparkleVariants}
              animate="animate"
            >
              <Star className="w-5 h-5" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center space-x-2 my-4"
            variants={itemVariants}
          >
            <motion.div animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}>
              <Award className="w-5 h-5 text-amber-500" />
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Our team will contact you shortly to arrange delivery of your motorcycle.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          <Link to="/">
            <Button variant="outline" className="w-full">Return Home</Button>
          </Link>
          <Link to="/products">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
