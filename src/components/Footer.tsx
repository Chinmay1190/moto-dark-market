
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];
  
  return (
    <footer className="bg-secondary pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-bold text-2xl font-['Racing_Sans_One'] text-gradient">
              SuperBikez
            </span>
            <p className="text-secondary-foreground/80">
              India's premier destination for luxury motorcycles and superbikes.
              Experience the thrill of the ride with our premium collection.
            </p>
            
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.label}
                    href={social.href} 
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-secondary-foreground/80 hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cart</Link></li>
              <li><Link to="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=sport" className="text-secondary-foreground/80 hover:text-primary transition-colors">Sport Bikes</Link></li>
              <li><Link to="/products?category=cruiser" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cruisers</Link></li>
              <li><Link to="/products?category=adventure" className="text-secondary-foreground/80 hover:text-primary transition-colors">Adventure</Link></li>
              <li><Link to="/products?category=naked" className="text-secondary-foreground/80 hover:text-primary transition-colors">Naked</Link></li>
              <li><Link to="/products?category=touring" className="text-secondary-foreground/80 hover:text-primary transition-colors">Touring</Link></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center text-secondary-foreground/80">
                <Mail className="min-w-5 h-5 text-primary" />
                <span>info@superbikez.com</span>
              </li>
              <li className="flex gap-3 items-center text-secondary-foreground/80">
                <Phone className="min-w-5 h-5 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-secondary-foreground/80">
                <MapPin className="min-w-5 h-5 mt-1 text-primary" />
                <span>MG Road, Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/80 text-sm">
            © {year} SuperBikez. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="text-secondary-foreground/80 text-sm hover:text-primary">Privacy Policy</Link>
            <Link to="#" className="text-secondary-foreground/80 text-sm hover:text-primary">Terms of Service</Link>
            <Link to="#" className="text-secondary-foreground/80 text-sm hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
