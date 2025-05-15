
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { allProducts, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SortOption, Product } from "@/types/product";
import { formatPrice } from "@/lib/formatters";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  
  const maxPrice = 5000000; // 50 lakhs maximum
  
  // Get filter values from URL params
  const categoryParam = searchParams.get("category") || "";
  const brandParam = searchParams.get("brand") || "";
  const searchParam = searchParams.get("search") || "";
  const sortParam = (searchParams.get("sort") || "price-asc") as SortOption;
  const inStockParam = searchParams.get("inStock") === "true";
  
  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let results = [...allProducts];
      
      // Apply category filter
      if (categoryParam) {
        results = results.filter(product => product.category === categoryParam);
      }
      
      // Apply brand filter
      if (brandParam) {
        results = results.filter(product => product.brand.toLowerCase() === brandParam.toLowerCase());
      }
      
      // Apply search
      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        results = results.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply price filter
      results = results.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortParam) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          results.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
      
      setFilteredProducts(results);
      setLoading(false);
    }, 500);
  }, [categoryParam, brandParam, searchParam, sortParam, inStockParam, priceRange]);
  
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, maxPrice]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs hover:bg-muted"
              >
                Clear all
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button
                      className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted transition-colors ${
                        categoryParam === "" ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => updateFilters("category", "")}
                    >
                      All Categories
                    </button>
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <button
                        className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted transition-colors ${
                          categoryParam === category.slug ? "bg-muted font-medium" : ""
                        }`}
                        onClick={() => updateFilters("category", category.slug)}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="font-medium mb-3">Brands</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button
                      className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted transition-colors ${
                        brandParam === "" ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => updateFilters("brand", "")}
                    >
                      All Brands
                    </button>
                  </div>
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <button
                        className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted transition-colors ${
                          brandParam === brand.slug ? "bg-muted font-medium" : ""
                        }`}
                        onClick={() => updateFilters("brand", brand.slug)}
                      >
                        {brand.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, maxPrice]}
                    value={priceRange}
                    min={0}
                    max={maxPrice}
                    step={50000}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Motorcycles</h1>
              
              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="sm">Filters</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down your motorcycle search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="categories">
                        <AccordionTrigger className="text-left">Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-2">
                            <div className="flex items-center">
                              <button
                                className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted ${
                                  categoryParam === "" ? "bg-muted font-medium" : ""
                                }`}
                                onClick={() => updateFilters("category", "")}
                              >
                                All Categories
                              </button>
                            </div>
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center">
                                <button
                                  className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted ${
                                    categoryParam === category.slug ? "bg-muted font-medium" : ""
                                  }`}
                                  onClick={() => updateFilters("category", category.slug)}
                                >
                                  {category.name}
                                </button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="brands">
                        <AccordionTrigger className="text-left">Brands</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-2">
                            <div className="flex items-center">
                              <button
                                className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted ${
                                  brandParam === "" ? "bg-muted font-medium" : ""
                                }`}
                                onClick={() => updateFilters("brand", "")}
                              >
                                All Brands
                              </button>
                            </div>
                            {brands.map((brand) => (
                              <div key={brand.id} className="flex items-center">
                                <button
                                  className={`w-full text-left px-2 py-1 rounded-md hover:bg-muted ${
                                    brandParam === brand.slug ? "bg-muted font-medium" : ""
                                  }`}
                                  onClick={() => updateFilters("brand", brand.slug)}
                                >
                                  {brand.name}
                                </button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="price">
                        <AccordionTrigger className="text-left">Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, maxPrice]}
                              value={priceRange}
                              min={0}
                              max={maxPrice}
                              step={50000}
                              onValueChange={(value) => setPriceRange(value as [number, number])}
                              className="mb-4"
                            />
                            <div className="flex justify-between text-sm">
                              <span>{formatPrice(priceRange[0])}</span>
                              <span>{formatPrice(priceRange[1])}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={clearFilters} variant="outline" className="w-full">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-60">
                <Input
                  placeholder="Search bikes..."
                  value={searchParam}
                  onChange={(e) => updateFilters("search", e.target.value)}
                  className="w-full"
                />
              </div>
              <Select
                value={sortParam}
                onValueChange={(value) => updateFilters("sort", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} results
              {categoryParam && ` for "${categories.find(c => c.slug === categoryParam)?.name || categoryParam}"`}
              {brandParam && ` from "${brands.find(b => b.slug === brandParam)?.name || brandParam}"`}
              {searchParam && ` matching "${searchParam}"`}
            </p>
          </div>
          
          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="aspect-[4/3] bg-muted animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-6 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Results Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
