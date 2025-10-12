import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session?.id || "default";
      const cartItems = await storage.getCartItems(sessionId);
      
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );

      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session?.id || "default";
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const cartItem = await storage.addToCart({
        productId,
        quantity,
        sessionId,
      });

      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 1) {
        return res.status(400).json({ error: "Valid quantity is required" });
      }

      const updatedItem = await storage.updateCartItem(req.params.id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      
      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const sessionId = req.session?.id || "default";
      const {
        customerName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
      } = req.body;

      if (!customerName || !email || !phone || !address || !city || !state || !pincode) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const cartItems = await storage.getCartItems(sessionId);
      
      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );

      const total = itemsWithProducts.reduce(
        (sum, item) => sum + Number(item.product!.price) * item.quantity,
        0
      );

      const deliveryFee = total > 500 ? 0 : 50;
      const finalTotal = total + deliveryFee;

      const order = await storage.createOrder({
        customerName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        items: JSON.stringify(itemsWithProducts),
        total: finalTotal.toString(),
      });

      await storage.clearCart(sessionId);

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
