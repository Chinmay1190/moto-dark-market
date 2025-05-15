
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatRating, calculateDiscount } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BadgeIndianRupee } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  
  // Find the current product
  const product = allProducts.find(p => p.id === Number(id));
  
  // Find related products (same category, different product)
  const relatedProducts = product
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  // Handle 404
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }
  
  // Calculate discount if original price exists
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
  
  // Handle quantity change
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg shadow-lg relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full animate-pulse-glow">
              {discount}% OFF
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          
          <div className="flex items-center mb-4 gap-2">
            <div className="text-amber-500 text-sm font-medium">
              {formatRating(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-3xl font-bold">{formatPrice(product.price)}</div>
            {product.originalPrice && (
              <div className="text-xl line-through text-muted-foreground">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
          
          <div className="space-y-6 mb-8">
            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium mb-2">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 rounded-full border ${
                      selectedColor === color 
                        ? "border-primary bg-primary/10" 
                        : "border-muted hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-l-md border border-input flex items-center justify-center hover:bg-muted"
                >
                  -
                </button>
                <div className="w-14 h-10 border-y border-input flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-r-md border border-input flex items-center justify-center hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1" 
                size="lg" 
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/cart");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
          
          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 border rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Displacement</p>
              <p className="font-medium">{product.displacement}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Power</p>
              <p className="font-medium">{product.power}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Torque</p>
              <p className="font-medium">{product.torque}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Speed</p>
              <p className="font-medium">{product.topSpeed}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">{product.weight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fuel Capacity</p>
              <p className="font-medium">{product.fuelCapacity}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none dark:prose-invert">
              <p>{product.description}</p>
              <p>
                This {product.brand} {product.name} superbike delivers exceptional performance and handling. With its powerful {product.displacement} engine producing {product.power} and {product.torque} of torque, it offers an exhilarating riding experience that's perfect for both track days and street riding.
              </p>
              <p>
                The motorcycle features advanced electronics, premium suspension components, and cutting-edge aerodynamics to ensure optimal stability and control at high speeds. Whether you're a seasoned rider or looking to upgrade to a superior machine, this superbike will exceed your expectations.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Engine & Performance</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Engine</td>
                      <td className="py-2 font-medium">{product.displacement}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Power</td>
                      <td className="py-2 font-medium">{product.power}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Torque</td>
                      <td className="py-2 font-medium">{product.torque}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Top Speed</td>
                      <td className="py-2 font-medium">{product.topSpeed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Physical Specifications</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Weight</td>
                      <td className="py-2 font-medium">{product.weight}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Fuel Capacity</td>
                      <td className="py-2 font-medium">{product.fuelCapacity}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Colors Available</td>
                      <td className="py-2 font-medium">{product.colors.join(", ")}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Category</td>
                      <td className="py-2 font-medium capitalize">{product.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2">Shipping Information</h3>
                <p>
                  We offer nationwide delivery for all our superbikes. Standard delivery takes 3-5 business days after the order is processed. For select locations, express delivery is available within 24-48 hours for an additional fee.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Free shipping for orders above ₹2,00,000</li>
                  <li>Standard shipping: ₹5,000 - ₹15,000 (based on location)</li>
                  <li>Express delivery: Additional ₹10,000</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2">Return Policy</h3>
                <p>
                  We want you to be completely satisfied with your purchase. If you receive a defective or damaged product, please contact our customer service within 48 hours of delivery. Each case will be evaluated individually.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The motorcycle must be unused and in original condition</li>
                  <li>All documentation and accessories must be intact</li>
                  <li>Refunds will be processed within 7-14 business days</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2">Warranty</h3>
                <p>
                  All our motorcycles come with a manufacturer's warranty. The duration and coverage may vary depending on the brand and model. Extended warranty options are available for purchase.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Motorcycles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
