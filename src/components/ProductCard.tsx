
import { Link } from "react-router-dom";
import { formatPrice, calculateDiscount } from "@/lib/formatters";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { BadgeIndianRupee, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;

  return (
    <div className="group relative card-hover overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      )}
      
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-medium">View Details</p>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-foreground/60">{product.brand}</span>
            <h3 className="text-base font-bold line-clamp-1">{product.name}</h3>
          </div>
          <div className="flex items-center text-amber-500 text-xs">
            {"★".repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 && "½"}
          </div>
        </div>
        
        <div className="mb-2 flex items-baseline gap-2">
          <div className="font-bold text-lg">{formatPrice(product.price)}</div>
          {discount > 0 && (
            <div className="text-sm line-through text-muted-foreground">
              {formatPrice(product.originalPrice!)}
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mb-4">
          <span className="inline-block mr-3">{product.displacement}</span>
          <span className="inline-block mr-3">{product.power}</span>
          <span className="inline-block">{product.torque}</span>
        </div>
        
        <Button 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            addToCart(product);
          }} 
          className="w-full"
          variant="outline"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
