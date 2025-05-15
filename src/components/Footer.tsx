
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <span className="font-bold text-2xl font-['Racing_Sans_One'] bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              SuperBikez
            </span>
            <p className="text-secondary-foreground/80">
              India's premier destination for luxury motorcycles and superbikes.
              Experience the thrill of the ride with our premium collection.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-secondary-foreground/80 hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=sport" className="text-secondary-foreground/80 hover:text-primary transition-colors">Sport Bikes</Link></li>
              <li><Link to="/products?category=cruiser" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cruisers</Link></li>
              <li><Link to="/products?category=adventure" className="text-secondary-foreground/80 hover:text-primary transition-colors">Adventure</Link></li>
              <li><Link to="/products?category=naked" className="text-secondary-foreground/80 hover:text-primary transition-colors">Naked</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="text-secondary-foreground/80">Email: info@superbikez.com</li>
              <li className="text-secondary-foreground/80">Phone: +91 98765 43210</li>
              <li className="text-secondary-foreground/80">
                Address: MG Road, Bangalore, Karnataka, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/80 text-sm">
            © {year} SuperBikez. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-secondary-foreground/80 text-sm">Privacy Policy</span>
            <span className="text-secondary-foreground/80 text-sm">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
