
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  useEffect(() => {
    // Trigger confetti animation when the page loads
    const duration = 3 * 1000;
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
    }, 150);
    
    return () => clearInterval(confettiInterval);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Order Successful!</h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-lg">
            Thank you for your purchase! Your superbike order has been placed successfully.
          </p>
          
          <div className="bg-muted/40 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              An email confirmation has been sent to your registered email address.
            </p>
            <p className="text-sm text-muted-foreground">
              Your order ID: <span className="font-medium">#SB{Math.floor(Math.random() * 900000) + 100000}</span>
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Our team will contact you shortly to arrange delivery of your motorcycle.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Link to="/">
            <Button variant="outline" className="w-full">Return Home</Button>
          </Link>
          <Link to="/products">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
