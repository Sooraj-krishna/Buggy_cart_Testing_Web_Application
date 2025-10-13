import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { IStorage } from './storage';
import * as schema from '@shared/schema';
import { InsertProduct, Product, CartItem, InsertCartItem, Order, InsertOrder } from '@shared/schema';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export class DbStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return await db.query.products.findMany();
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return await db.query.products.findFirst({
      where: eq(schema.products.id, id),
    });
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(schema.products).values(product).returning();
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.query.cartItems.findMany({
      where: eq(schema.cartItems.sessionId, sessionId),
    });
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [newCartItem] = await db.insert(schema.cartItems).values(item).returning();
    return newCartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [updatedCartItem] = await db.update(schema.cartItems).set({ quantity }).where(eq(schema.cartItems.id, id)).returning();
    return updatedCartItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(schema.cartItems).where(eq(schema.cartItems.id, id));
    return result.rowCount > 0;
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.sessionId, sessionId));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(schema.orders).values(order).returning();
    return newOrder;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return await db.query.orders.findFirst({
      where: eq(schema.orders.id, id),
    });
  }
}
