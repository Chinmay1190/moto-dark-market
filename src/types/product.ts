
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number; // in INR
  originalPrice?: number; // for discounts
  imageUrl: string;
  category: string;
  displacement: string; // engine displacement in cc
  power: string; // horsepower
  torque: string; // Nm
  topSpeed: string; // km/h
  weight: string; // kg
  fuelCapacity: string; // liters
  colors: string[];
  rating: number;
  description: string;
  featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
