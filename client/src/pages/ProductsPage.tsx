import React, { useState, useEffect } from 'react';

// 1. Define a product data structure
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

// 2. Define the ProductCard component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-lg font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-600 text-sm flex-grow mb-4">{product.description}</p>
      <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Add to Cart
      </button>
    </div>
  );
};

// 3. Implement the ProductsPage component
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assuming a backend API endpoint at /api/products
        // This endpoint should return an array of Product objects.
        const response = await fetch('/api/products');

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        // Type assertion for error handling
        if (err instanceof Error) {
          setError(`Failed to fetch products: ${err.message}`);
        } else {
          setError('An unknown error occurred while fetching products.');
        }
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-700">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600 font-bold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;