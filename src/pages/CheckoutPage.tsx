
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  
  const [deliveryOption, setDeliveryOption] = useState("standard");
  
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces for readability
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData({
        ...formData,
        [name]: formatted.slice(0, 19) // limit to 16 digits plus spaces
      });
    } 
    // Format expiry date as MM/YY
    else if (name === "expiry") {
      const formatted = value.replace(/\D/g, "");
      if (formatted.length <= 2) {
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({
          ...formData,
          [name]: `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`
        });
      }
    }
    // Format CVV (numbers only, max 3-4 digits)
    else if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
    } 
    // Format phone (numbers only)
    else if (name === "phone") {
      const formatted = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: formatted });
    }
    // Format pincode (numbers only, max 6 digits)
    else if (name === "pincode") {
      const formatted = value.replace(/\D/g, "").slice(0, 6);
      setFormData({ ...formData, [name]: formatted });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const calculateDeliveryFee = () => {
    return deliveryOption === "express" ? 10000 : 5000;
  };
  
  const calculateTax = () => {
    // 18% GST
    return totalPrice * 0.18;
  };
  
  const calculateTotal = () => {
    return totalPrice + calculateTax() + calculateDeliveryFee();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const requiredFields = [
      "fullName", "email", "phone", "address", "city", "state", "pincode", 
      "cardName", "cardNumber", "expiry", "cvv"
    ];
    
    const invalidFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (invalidFields.length > 0) {
      toast.error(`Please fill in all required fields`);
      return;
    }
    
    // Check if card number is valid (simple validation)
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }
    
    // Check if CVV is valid
    if (formData.cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return;
    }
    
    // Check if expiry date is valid
    const [month, year] = formData.expiry.split("/");
    if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
      toast.error("Please enter a valid expiry date");
      return;
    }
    
    setLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      clearCart();
      navigate("/success");
      setLoading(false);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Delivery Option */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Delivery Options</h2>
              
              <div className="flex flex-col gap-3">
                <label className={`flex items-start border rounded-lg p-4 cursor-pointer ${deliveryOption === 'standard' ? 'border-primary bg-primary/5' : ''}`}>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="standard"
                    className="mt-1"
                    checked={deliveryOption === "standard"}
                    onChange={() => setDeliveryOption("standard")}
                  />
                  <div className="ml-4">
                    <div className="font-medium">Standard Delivery</div>
                    <div className="text-sm text-muted-foreground">3-5 business days</div>
                    <div className="font-medium mt-1">{formatPrice(5000)}</div>
                  </div>
                </label>
                
                <label className={`flex items-start border rounded-lg p-4 cursor-pointer ${deliveryOption === 'express' ? 'border-primary bg-primary/5' : ''}`}>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="express"
                    className="mt-1"
                    checked={deliveryOption === "express"}
                    onChange={() => setDeliveryOption("express")}
                  />
                  <div className="ml-4">
                    <div className="font-medium">Express Delivery</div>
                    <div className="text-sm text-muted-foreground">1-2 business days</div>
                    <div className="font-medium mt-1">{formatPrice(10000)}</div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardName">Name on Card *</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date (MM/YY) *</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="XXX"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t lg:hidden">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{formatPrice(calculateDeliveryFee())}</span>
                </div>
                
                <div className="flex justify-between pt-4 border-t text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay {formatPrice(calculateTotal())}
                </span>
              )}
            </Button>
          </form>
        </div>
        
        {/* Order Summary - Desktop */}
        <div className="hidden lg:block">
          <div className="border rounded-lg p-6 space-y-6 bg-background sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Qty {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>{formatPrice(calculateTax())}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{formatPrice(calculateDeliveryFee())}</span>
              </div>
              
              <div className="flex justify-between pt-4 border-t text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
