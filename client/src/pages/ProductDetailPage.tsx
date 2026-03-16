import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { WishlistButton } from '@/components/WishlistButton.tsx'; // Being created
// The WishlistContext is imported by WishlistButton, so we don't need to import useWishlist directly here unless we want to display wishlist status on the page.

// Define a Product interface. In a real app, this would likely come from a shared schema or types file.
// For this example, we define it locally.
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

// Mock product data for demonstration purposes.
// In a real application, this data would be fetched from an API.
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Elegant Smartwatch',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/400x400?text=Smartwatch',
    description: 'Stay connected and track your fitness with this sleek and elegant smartwatch. Features include heart rate monitoring, GPS, and notifications.',
  },
  {
    id: 'prod2',
    name: 'Noise-Cancelling Headphones',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/400x400?text=Headphones',
    description: 'Immerse yourself in your music with premium noise-cancelling headphones. Enjoy crystal-clear audio and comfortable earcups for long listening sessions.',
  },
  {
    id: 'prod3',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/400x400?text=Speaker',
    description: 'Take your music anywhere with this powerful and compact portable Bluetooth speaker. Waterproof design and long battery life make it perfect for outdoor adventures.',
  },
  {
    id: 'prod4',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    imageUrl: 'https://via.placeholder.com/400x400?text=Office+Chair',
    description: 'Boost your productivity and comfort with an ergonomic office chair. Fully adjustable to support your posture during long working hours.',
  },
];

function ProductDetailPage() {
  // We assume `react-router-dom` is used for routing and `productId` is a URL parameter.
  const { productId } = useParams<{ productId: string }>();

  // Find the product based on the ID from the mock data.
  const product = MOCK_PRODUCTS.find(p => p.id === productId);

  if (!product) {
    // Handle case where product is not found
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">The product you are looking for does not exist or has been removed.</p>
        <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-full h-auto rounded-lg object-cover aspect-square"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4">
              <CardHeader className="p-0">
                <CardTitle className="text-4xl font-extrabold text-gray-900">{product.name}</CardTitle>
                <CardDescription className="text-2xl font-semibold text-primary mt-2">
                  ${product.price.toFixed(2)}
                </CardDescription>
              </CardHeader>

              <Separator className="my-4" />

              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <Separator className="my-4" />

              {/* Action Buttons */}
              <CardFooter className="flex flex-col sm:flex-row gap-4 p-0 mt-4">
                <Button size="lg" className="w-full sm:w-auto">Add to Cart</Button> {/* Placeholder for cart functionality */}
                <WishlistButton product={product} />
              </CardFooter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailPage;