import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useCart } from '@/context/CartContext.tsx'; // Assuming CartContext exports a useCart hook
import { cn } from '@/lib/utils.ts';

// Assuming CartContext.tsx defines Product and CartItem types
// For clarity, let's define a minimal Product type here if not explicitly imported
// from CartContext.tsx or shared/schema.ts.
// However, useCart hook should provide typed cartItems.
// If shared/schema.ts has a Product type, it would be ideal to import it.
// For now, I'll rely on the type inference from useCart, or define a local one if needed.

// Let's assume CartContext.tsx exports these types:
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string; // Optional image URL
}

interface CartItem extends Product {
  quantity: number;
}


function CartSheet() {
  const {
    isCartOpen,
    cartItems,
    cartTotal,
    itemCount,
    closeCart,
    addToCart, // Used for increasing quantity
    removeFromCart, // Used for removing item completely
    updateQuantity, // Used for setting specific quantity or decreasing
  } = useCart();

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id); // Remove if quantity becomes 0
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Your Cart ({itemCount})
          </SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-12 text-center text-muted-foreground">
            <ShoppingCart className="h-16 w-16 mb-4 text-gray-400" />
            <p className="text-lg font-semibold">Your cart is empty.</p>
            <p className="text-sm">Add some amazing products to get started!</p>
            <Button onClick={closeCart} asChild className="mt-6">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.imageUrl || '/placeholder-product.png'} // Use a placeholder if no image
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-foreground">
                          <Link to={`/products/${item.id}`} onClick={closeCart}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="ml-4 text-sm font-medium text-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button asChild onClick={closeCart}>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" asChild onClick={closeCart}>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;