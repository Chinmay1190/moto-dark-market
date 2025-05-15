
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUp } from "lucide-react";

const HomePage = () => {
  const featuredProducts = products.filter(product => product.featured);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558981001-1995369a39cd?q=80&w=1170&auto=format&fit=crop" 
            alt="Hero Superbike"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="container mx-auto h-full flex items-center relative px-4">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Racing_Sans_One']">
              Experience the <span className="text-primary">Ultimate</span> Rush
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              India's premier destination for luxury superbikes. Shop from our collection of 70+ high-performance motorcycles from top global brands.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Shop Now
                </Button>
              </Link>
              <Link to="/products?category=sport">
                <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Explore Sport Bikes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated bike silhouette */}
        <div className="absolute bottom-10 w-full">
          <div className="relative w-32 h-16 opacity-50 mx-auto animate-bike-ride">
            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-white">
              <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H459.6c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26C422.5 20.8 448.3 0 480 0c8.8 0 16 7.2 16 16V48c0 8.8 7.2 16 16 16s16-7.2 16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16V48c0 8.8 7.2 16 16 16s16-7.2 16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16V48c0 8.8-7.2 16-16 16V96c0 8.8-7.2 16-16 16H512c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32V96c17.7 0 32-14.3 32-32V48c26.5 0 48 21.5 48 48V96c0 26.5-21.5 48-48 48h-44.2L339 255.2c29.9 16.2 54.2 40.5 70.4 70.4C432.2 310.2 459.8 300.9 489 300l9-27.8c4-12.2-2.4-25.3-14.5-29.5l-28.1-9.9c-3.7-1.3-6.2-4.9-6-8.7l.2-7c.3-11-8.3-20.3-19.3-20.7l-53.6-1.7c-12.8-.4-22.7 11.3-19.9 23.8l11.1 50.1c2 9.1 9.2 16.3 18.3 18.3l53.1 11.8zM128 352c0 53 43 96 96 96s96-43 96-96s-43-96-96-96s-96 43-96 96zm32 0a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM464 288c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64s-28.7-64-64-64z"/>
            </svg>
            <div className="bike-shadow" />
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Bikes</h2>
              <p className="text-muted-foreground">Discover our most popular high-performance machines</p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0 text-primary hover:underline">View All Bikes →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Shop by Category</h2>
          <p className="text-muted-foreground text-center mb-10">Find the perfect ride for your style</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover-scale"
              >
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  <div className="text-3xl font-semibold text-primary group-hover:scale-110 transition-transform duration-300">
                    {category.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brands */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Top Brands</h2>
          <p className="text-muted-foreground text-center mb-10">Explore motorcycles from world-renowned manufacturers</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {brands.slice(0, 8).map(brand => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.slug}`}
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558980394-34764db076c4?q=80&w=1170&auto=format&fit=crop" 
            alt="Superbike on road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Power?</h2>
            <p className="text-xl text-white/90 mb-8">
              Browse our extensive collection of premium motorcycles and find your perfect match.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Explore All Bikes
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary rounded-full text-white shadow-lg hover:bg-primary/90 transition-all z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
