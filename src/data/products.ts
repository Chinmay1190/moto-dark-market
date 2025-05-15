
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Suzuki Hayabusa",
    brand: "Suzuki",
    price: 1640000,
    originalPrice: 1700000,
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1170&auto=format&fit=crop",
    category: "sport",
    displacement: "1340cc",
    power: "190 HP",
    torque: "150 Nm",
    topSpeed: "299 km/h",
    weight: "266 kg",
    fuelCapacity: "20 L",
    colors: ["Black", "White", "Blue"],
    rating: 4.9,
    description: "The legendary Suzuki Hayabusa is known for its ultimate performance and distinctive aerodynamic styling.",
    featured: true
  },
  {
    id: 2,
    name: "Kawasaki Ninja H2",
    brand: "Kawasaki",
    price: 3350000,
    originalPrice: 3500000,
    imageUrl: "https://images.unsplash.com/photo-1571646750134-0e6e92f6efc4?q=80&w=1074&auto=format&fit=crop",
    category: "sport",
    displacement: "998cc",
    power: "310 HP",
    torque: "165 Nm",
    topSpeed: "400 km/h",
    weight: "238 kg",
    fuelCapacity: "17 L",
    colors: ["Silver Mirror", "Carbon Black"],
    rating: 4.8,
    description: "The Kawasaki Ninja H2 is a supercharged supersport motorcycle with unprecedented power and performance.",
    featured: true
  },
  {
    id: 3,
    name: "Ducati Panigale V4",
    brand: "Ducati",
    price: 2699000,
    imageUrl: "https://images.unsplash.com/photo-1568772585471-9e24a0a9494c?q=80&w=1171&auto=format&fit=crop",
    category: "sport",
    displacement: "1103cc",
    power: "214 HP",
    torque: "124 Nm",
    topSpeed: "299 km/h",
    weight: "175 kg",
    fuelCapacity: "16 L",
    colors: ["Ducati Red", "Dark Stealth", "Winter Test"],
    rating: 4.9,
    description: "The Ducati Panigale V4 is the peak of Ducati engineering and performance, delivering race-ready power.",
    featured: true
  },
  {
    id: 4,
    name: "BMW S 1000 RR",
    brand: "BMW",
    price: 2050000,
    originalPrice: 2200000,
    imageUrl: "https://images.unsplash.com/photo-1549027032-1977dc959192?q=80&w=1170&auto=format&fit=crop",
    category: "sport",
    displacement: "999cc",
    power: "207 HP",
    torque: "113 Nm",
    topSpeed: "299 km/h",
    weight: "197 kg",
    fuelCapacity: "16.5 L",
    colors: ["Racing Red", "Light White", "Black Storm"],
    rating: 4.8,
    description: "The BMW S 1000 RR is a high-performance race-oriented sport bike with cutting-edge electronics.",
    featured: true
  },
  {
    id: 5,
    name: "Harley-Davidson Fat Boy",
    brand: "Harley-Davidson",
    price: 1900000,
    imageUrl: "https://images.unsplash.com/photo-1575014912260-f869472cfacf?q=80&w=1170&auto=format&fit=crop",
    category: "cruiser",
    displacement: "1868cc",
    power: "94 HP",
    torque: "155 Nm",
    topSpeed: "180 km/h",
    weight: "317 kg",
    fuelCapacity: "18.9 L",
    colors: ["Vivid Black", "River Rock Gray", "Midnight Crimson"],
    rating: 4.7,
    description: "The Harley-Davidson Fat Boy is an icon of American cruiser styling with solid wheels and a muscular stance."
  },
  {
    id: 6,
    name: "Triumph Rocket 3",
    brand: "Triumph",
    price: 1950000,
    imageUrl: "https://images.unsplash.com/photo-1665105325086-ec13015e92f7?q=80&w=1174&auto=format&fit=crop",
    category: "cruiser",
    displacement: "2458cc",
    power: "167 HP",
    torque: "221 Nm",
    topSpeed: "209 km/h",
    weight: "291 kg",
    fuelCapacity: "18 L",
    colors: ["Phantom Black", "Silver Ice", "Cranberry Red"],
    rating: 4.6,
    description: "The Triumph Rocket 3 boasts the world's largest production motorcycle engine displacement at 2,458cc."
  },
  {
    id: 7,
    name: "Royal Enfield Continental GT 650",
    brand: "Royal Enfield",
    price: 309000,
    originalPrice: 329000,
    imageUrl: "https://images.unsplash.com/photo-1635073908681-b4dfb0147e5a?q=80&w=1228&auto=format&fit=crop",
    category: "cafe racer",
    displacement: "648cc",
    power: "47 HP",
    torque: "52 Nm",
    topSpeed: "160 km/h",
    weight: "198 kg",
    fuelCapacity: "12.5 L",
    colors: ["Mr Clean", "Black Magic", "Ventura Blue", "Dr. Mayhem"],
    rating: 4.5,
    description: "The Royal Enfield Continental GT 650 is a cafe racer that combines retro style with modern performance."
  },
  {
    id: 8,
    name: "Honda Africa Twin",
    brand: "Honda",
    price: 1590000,
    imageUrl: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?q=80&w=1170&auto=format&fit=crop",
    category: "adventure",
    displacement: "1084cc",
    power: "100 HP",
    torque: "105 Nm",
    topSpeed: "214 km/h",
    weight: "226 kg",
    fuelCapacity: "24.8 L",
    colors: ["Pearl Glare White", "Grand Prix Red", "Matte Ballistic Black"],
    rating: 4.7,
    description: "The Honda Africa Twin is a versatile adventure motorcycle ready to tackle any terrain with ease."
  },
  {
    id: 9,
    name: "Ducati Monster",
    brand: "Ducati",
    price: 1280000,
    imageUrl: "https://images.unsplash.com/photo-1568772585441-9e6eabc61a1f?q=80&w=1171&auto=format&fit=crop",
    category: "naked",
    displacement: "937cc",
    power: "111 HP",
    torque: "93 Nm",
    topSpeed: "240 km/h",
    weight: "166 kg",
    fuelCapacity: "14 L",
    colors: ["Ducati Red", "Dark Stealth", "Aviator Grey"],
    rating: 4.6,
    description: "The Ducati Monster is a naked motorcycle that defined the streetfighter category with its minimalist design."
  },
  {
    id: 10,
    name: "KTM 390 Duke",
    brand: "KTM",
    price: 289000,
    originalPrice: 310000,
    imageUrl: "https://images.unsplash.com/photo-1626664668400-1e7f2e247216?q=80&w=1170&auto=format&fit=crop",
    category: "naked",
    displacement: "373cc",
    power: "43 HP",
    torque: "37 Nm",
    topSpeed: "170 km/h",
    weight: "149 kg",
    fuelCapacity: "13.4 L",
    colors: ["Orange", "White"],
    rating: 4.5,
    description: "The KTM 390 Duke is a high-performance naked motorcycle that offers exceptional value with premium components."
  },
  {
    id: 11,
    name: "Yamaha YZF R1",
    brand: "Yamaha",
    price: 2050000,
    imageUrl: "https://images.unsplash.com/photo-1611241443322-b5aff8806fde?q=80&w=1170&auto=format&fit=crop",
    category: "sport",
    displacement: "998cc",
    power: "200 HP",
    torque: "112 Nm",
    topSpeed: "299 km/h",
    weight: "201 kg",
    fuelCapacity: "17 L",
    colors: ["Team Yamaha Blue", "Midnight Black", "Raven"],
    rating: 4.8,
    description: "The Yamaha YZF R1 is a high-performance superbike with sophisticated electronics derived from MotoGP."
  },
  {
    id: 12,
    name: "Aprilia RSV4",
    brand: "Aprilia",
    price: 2399000,
    imageUrl: "https://images.unsplash.com/photo-1676131382527-5989a9c2c837?q=80&w=1084&auto=format&fit=crop",
    category: "sport",
    displacement: "1099cc",
    power: "217 HP",
    torque: "125 Nm",
    topSpeed: "299 km/h",
    weight: "180 kg",
    fuelCapacity: "18.5 L",
    colors: ["Aprilia Black", "Lava Red"],
    rating: 4.8,
    description: "The Aprilia RSV4 is a racing powerhouse with MotoGP-derived technology and sharp handling characteristics."
  }
];

// Add more products to reach 70+ by duplicating and modifying existing ones
// Creating product variations (uncomment and update when needed)
export const allProducts: Product[] = [
  ...products,
  // Generate more products to reach 70+
  ...Array.from({ length: 60 }, (_, i) => {
    const baseProduct = products[i % products.length];
    return {
      ...baseProduct,
      id: products.length + i + 1,
      name: `${baseProduct.name} ${['Special Edition', 'Pro', 'Limited', 'Racing Edition', 'Sport'][Math.floor(Math.random() * 5)]}`,
      price: baseProduct.price * (0.9 + Math.random() * 0.4), // price variation
      colors: [...baseProduct.colors].sort(() => Math.random() - 0.5),
      rating: Math.min(5, baseProduct.rating * (0.95 + Math.random() * 0.1))
    };
  })
];

export const categories = [
  { id: 1, name: "Sport Bikes", slug: "sport" },
  { id: 2, name: "Cruisers", slug: "cruiser" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 4, name: "Naked", slug: "naked" },
  { id: 5, name: "Cafe Racer", slug: "cafe-racer" }
];

export const brands = [
  { id: 1, name: "Suzuki", slug: "suzuki", logo: "suzuki-logo.png" },
  { id: 2, name: "Kawasaki", slug: "kawasaki", logo: "kawasaki-logo.png" },
  { id: 3, name: "Ducati", slug: "ducati", logo: "ducati-logo.png" },
  { id: 4, name: "BMW", slug: "bmw", logo: "bmw-logo.png" },
  { id: 5, name: "Harley-Davidson", slug: "harley-davidson", logo: "harley-davidson-logo.png" },
  { id: 6, name: "Triumph", slug: "triumph", logo: "triumph-logo.png" },
  { id: 7, name: "Royal Enfield", slug: "royal-enfield", logo: "royal-enfield-logo.png" },
  { id: 8, name: "Honda", slug: "honda", logo: "honda-logo.png" },
  { id: 9, name: "KTM", slug: "ktm", logo: "ktm-logo.png" },
  { id: 10, name: "Yamaha", slug: "yamaha", logo: "yamaha-logo.png" },
  { id: 11, name: "Aprilia", slug: "aprilia", logo: "aprilia-logo.png" }
];
