import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export default function Cart() {
  const { toast } = useToast();

  const { data: cartItems, isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (data: { itemId: string; quantity: number }) =>
      apiRequest("PATCH", `/api/cart/${data.itemId}`, { quantity: data.quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) =>
      apiRequest("DELETE", `/api/cart/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
  });

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  ) || 0;

  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Link href="/products">
            <Button data-testid="button-continue-shopping">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`} className="p-4">
                <div className="flex gap-4">
                  <Link href={`/product/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded border border-border"
                      data-testid={`img-cart-item-${item.id}`}
                    />
                  </Link>

                  <div className="flex-1">
                    <Link href={`/product/${item.product.id}`}>
                      <h3
                        data-testid={`text-cart-item-name-${item.id}`}
                        className="font-semibold text-lg mb-1 hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.brand}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border rounded">
                        <Button
                          data-testid={`button-decrease-${item.id}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="hover-elevate"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          data-testid={`text-quantity-${item.id}`}
                          className="px-4 font-semibold"
                        >
                          {item.quantity}
                        </span>
                        <Button
                          data-testid={`button-increase-${item.id}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="hover-elevate"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span
                        data-testid={`text-price-${item.id}`}
                        className="text-xl font-bold"
                      >
                        ₹{(Number(item.product.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    data-testid={`button-remove-${item.id}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="hover:bg-destructive/10 hover:text-destructive hover-elevate"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <Separator className="mb-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal" className="font-semibold">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span data-testid="text-delivery-fee" className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(500 - subtotal).toLocaleString()} more for free delivery
                  </p>
                )}
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span data-testid="text-total" className="text-2xl font-bold text-primary">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    data-testid="input-promo-code"
                    placeholder="Enter code"
                  />
                  <Button
                    data-testid="button-apply-promo"
                    variant="outline"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  data-testid="button-checkout"
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  data-testid="button-continue-shopping-cart"
                  variant="outline"
                  className="w-full mt-2"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
