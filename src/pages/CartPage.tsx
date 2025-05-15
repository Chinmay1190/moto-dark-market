
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: number, quantity: string) => {
    const parsedQuantity = parseInt(quantity);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      updateQuantity(id, parsedQuantity);
    }
  };
  
  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "super10") {
      toast.success("Coupon code applied successfully!");
      setCouponApplied(true);
    } else {
      toast.error("Invalid coupon code");
    }
  };
  
  const calculateDiscount = () => {
    return couponApplied ? totalPrice * 0.1 : 0;
  };
  
  const calculateTax = () => {
    // 18% GST
    return (totalPrice - calculateDiscount()) * 0.18;
  };
  
  const calculateShipping = () => {
    // Free shipping above INR 200,000
    return totalPrice > 200000 ? 0 : 5000;
  };
  
  const calculateTotal = () => {
    return totalPrice - calculateDiscount() + calculateTax() + calculateShipping();
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any motorcycles to your cart yet.
          </p>
          <Link to="/products">
            <Button>Browse Motorcycles</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="border rounded-lg overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row border-b last:border-b-0 p-4">
                <div className="sm:w-32 sm:h-32 mb-4 sm:mb-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.brand}</p>
                    </div>
                    <div className="text-lg font-bold mt-2 sm:mt-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <button 
                        className="w-8 h-8 border rounded-l flex items-center justify-center hover:bg-muted"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 h-8 border-y border-l-0 border-r-0 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button 
                        className="w-8 h-8 border rounded-r flex items-center justify-center hover:bg-muted"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Continue Shopping */}
          <div className="mt-6">
            <Link to="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-6 bg-background sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Coupon Code */}
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
              />
              <Button 
                variant="outline" 
                onClick={handleApplyCoupon}
                disabled={couponApplied}
              >
                Apply
              </Button>
            </div>
            
            {/* Summary Items */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(calculateDiscount())}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>{formatPrice(calculateTax())}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{calculateShipping() > 0 ? formatPrice(calculateShipping()) : 'Free'}</span>
              </div>
              
              <div className="flex justify-between pt-4 border-t text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button 
              className="w-full" 
              size="lg" 
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Payment Methods */}
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>We accept multiple payment methods</p>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="font-medium">UPI</span>
                <span>|</span>
                <span className="font-medium">Credit Card</span>
                <span>|</span>
                <span className="font-medium">Debit Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
