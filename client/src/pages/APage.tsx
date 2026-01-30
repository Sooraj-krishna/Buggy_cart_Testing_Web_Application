import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useCart } from '@/context/CartContext.tsx';
import { Product } from '@shared/schema.ts'; // Assuming Product type is defined in shared schema

function APage() {
  const { addItemToCart } = useCart();

  // Simulate a product for demonstration purposes.
  // In a real application, this data would typically come from an API call
  // based on a product ID from the URL or props.
  const sampleProduct: Product = {
    id: 'prod_a001',
    name: 'Premium Widget A',
    description: 'A high-quality widget designed for optimal performance and durability. Perfect for various applications.',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Premium+Widget+A',
    categoryId: 'cat_widgets',
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddToCart = () => {
    addItemToCart(sampleProduct, 1); // Add 1 quantity of the sample product
    // Optionally, you could add a toast notification here to confirm addition
    // import { useToast } from '@/hooks/use-toast.ts';
    // const { toast } = useToast();
    // toast({
    //   title: "Item added to cart!",
    //   description: `${sampleProduct.name} has been added to your cart.`,
    // });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Product Detail: {sampleProduct.name}</h1>

      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={sampleProduct.imageUrl}
            alt={sampleProduct.name}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-xl border border-gray-200"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900">{sampleProduct.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{sampleProduct.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">${sampleProduct.price.toFixed(2)}</span>
            {sampleProduct.stock > 0 ? (
              <span className="text-sm text-green-600">(In Stock: {sampleProduct.stock})</span>
            ) : (
              <span className="text-sm text-red-600">(Out of Stock)</span>
            )}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleAddToCart}
              className="w-full py-3 text-lg"
              disabled={sampleProduct.stock === 0}
            >
              {sampleProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APage;