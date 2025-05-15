
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Shield, Award, Clock, CheckCircle, TrendingUp } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import StatsSection from "@/components/StatsSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience the thrill of acceleration with our high-performance superbikes."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All our motorcycles come with advanced safety features to keep you protected."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Our collection includes multiple award-winning models from prestigious competitions."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated team is available around the clock for all your service needs."
    }
  ];
  
  const testimonials = [
    {
      name: "Rahul Sharma",
      position: "Professional Racer",
      testimonial: "The performance of my SuperBikez motorcycle is unmatched. I've won three championships with it!",
      rating: 5,
      avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop"
    },
    {
      name: "Priya Patel",
      position: "Weekend Rider",
      testimonial: "As a weekend rider, I needed something reliable yet exciting. SuperBikez delivered exactly that.",
      rating: 4,
      avatarSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop"
    },
    {
      name: "Vikram Singh",
      position: "Motorcycle Collector",
      testimonial: "Their collection is impressive. I've purchased multiple bikes and each one has exceeded my expectations.",
      rating: 5,
      avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop"
    }
  ];
  
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
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Racing_Sans_One']"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience the <span className="text-gradient">Ultimate</span> Rush
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              India's premier destination for luxury superbikes. Shop from our collection of 70+ high-performance motorcycles from top global brands.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link to="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white button-glow">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Shop Now
                </Button>
              </Link>
              <Link to="/products?category=sport">
                <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Explore Sport Bikes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated bike silhouette */}
        <div className="absolute bottom-10 w-full">
          <motion.div 
            className="relative w-32 h-16 opacity-50 mx-auto"
            animate={{
              x: ["calc(-100% - 128px)", "100vw"],
              transition: {
                x: { duration: 10, repeat: Infinity, ease: "linear" }
              }
            }}
          >
            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-white">
              <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H459.6c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26C422.5 20.8 448.3 0 480 0c8.8 0 16 7.2 16 16V48c0 8.8 7.2 16 16 16s16-7.2 16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16V48c0 8.8 7.2 16 16 16s16-7.2 16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16V48c0 8.8-7.2 16-16 16V96c0 8.8-7.2 16-16 16H512c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32V96c17.7 0 32-14.3 32-32V48c26.5 0 48 21.5 48 48V96c0 26.5-21.5 48-48 48h-44.2L339 255.2c29.9 16.2 54.2 40.5 70.4 70.4C432.2 310.2 459.8 300.9 489 300l9-27.8c4-12.2-2.4-25.3-14.5-29.5l-28.1-9.9c-3.7-1.3-6.2-4.9-6-8.7l.2-7c.3-11-8.3-20.3-19.3-20.7l-53.6-1.7c-12.8-.4-22.7 11.3-19.9 23.8l11.1 50.1c2 9.1 9.2 16.3 18.3 18.3l53.1 11.8zM128 352c0 53 43 96 96 96s96-43 96-96s-43-96-96-96s-96 43-96 96zm32 0a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM464 288c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64s-28.7-64-64-64z"/>
            </svg>
            <div className="bike-shadow" />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose SuperBikez?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Experience the best service and selection when you shop with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-baseline mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Bikes</h2>
              <p className="text-muted-foreground">Discover our most popular high-performance machines</p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0 text-primary hover:underline">View All Bikes →</Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants} custom={index}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Hear from our satisfied riders and their experiences
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                delay={index}
              />
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
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-md hover-scale block"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                    <div className="text-3xl font-semibold text-primary group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brands */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Top Brands</h2>
          <p className="text-muted-foreground text-center mb-10">Explore motorcycles from world-renowned manufacturers</p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {brands.slice(0, 8).map((brand, index) => (
              <motion.div key={brand.id} variants={itemVariants}>
                <Link
                  to={`/products?brand=${brand.slug}`}
                  className="text-xl font-bold hover:text-primary transition-colors"
                >
                  {brand.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest models, exclusive offers and motorcycle news
            </p>
            <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button type="submit" className="button-glow">
                Subscribe
              </Button>
            </form>
          </motion.div>
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
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Power?</h2>
            <p className="text-xl text-white/90 mb-8">
              Browse our extensive collection of premium motorcycles and find your perfect match.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white button-glow">
                Explore All Bikes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
