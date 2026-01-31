import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import CategoryFilter from '@/components/CategoryFilter.tsx';

// Define a Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Helper function to generate random products
const generateRandomProducts = (count: number): Product[] => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys', 'Food'];
  const adjectives = ['Stylish', 'Modern', 'Classic', 'Durable', 'Eco-Friendly', 'Smart', 'Portable', 'Comfortable', 'Premium', 'Essential'];
  const nouns = ['Gadget', 'Apparel', 'Book', 'Utensil', 'Gear', 'Cosmetic', 'Toy', 'Snack', 'Accessory', 'Device'];

  const products: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const id = `prod-${i}`;
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const name = `${randomAdjective} ${randomNoun} ${i}`;
    const description = `Discover the ${randomAdjective.toLowerCase()} features of this ${randomNoun.toLowerCase()}. Perfect for everyday use and designed for your convenience.`;
    const price = parseFloat((Math.random() * 100 + 10).toFixed(2)); // Price between 10 and 110
    const imageUrl = `https://picsum.photos/seed/${id}/300/200`; // Unique image for each product
    const category = categories[Math.floor(Math.random() * categories.length)];

    products.push({
      id,
      name,
      description,
      price,
      imageUrl,
      category,
    });
  }
  return products;
};

// Generate a static list of products and categories for the page
const ALL_PRODUCTS = generateRandomProducts(50); // Generate 50 random products initially
const ALL_CATEGORIES = Array.from(new Set(ALL_PRODUCTS.map(p => p.category)));

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // 'All' for no category filter

  // Filter products based on search term and selected category
  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    if (selectedCategory !== 'All') {
      products = products.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      products = products.filter(
        product =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return products;
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Category Filter */}
        {/* Assuming CategoryFilter component takes a list of categories, a selectedCategory, and an onSelect handler */}
        <div className="md:w-1/4 lg:w-1/5">
          <CategoryFilter
            categories={['All', ...ALL_CATEGORIES]} // Add 'All' option to categories
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Search Input */}
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-16">No products found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            // ProductCard component is expected to take a 'product' prop
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;