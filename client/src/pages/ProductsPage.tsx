import React from 'react';
import ProductCard from '@/components/ProductCard.tsx';
import { sampleProducts, Product } from '@/data/sample-products.ts'; // Assuming Product interface is also exported from here

/**
 * ProductsPage component displays a grid of sample products.
 * It fetches product data from a local source and renders each product
 * using the reusable ProductCard component.
 */
function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;