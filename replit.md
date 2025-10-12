# ShopKart - E-Commerce Testing Platform

## Overview
A Flipkart-inspired e-commerce website built specifically for testing automated bug detection and fixing tools. The application features a complete shopping experience with intentional bugs strategically placed throughout the codebase.

## Tech Stack
- **Frontend**: React, TypeScript, Wouter (routing), TanStack Query, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Storage**: In-memory storage (MemStorage)
- **Styling**: Flipkart-inspired blue (#2874f0) color scheme with golden accents

## Features
### Core Functionality
- ✅ Product catalog with categories (Electronics, Fashion, Home & Kitchen, Books, Sports)
- ✅ Product detail pages with image gallery, ratings, and specifications
- ✅ Shopping cart with quantity management
- ✅ Checkout flow with delivery information form
- ✅ Search functionality in header
- ✅ Category filters and sorting options
- ✅ Hero carousel with promotional banners
- ✅ Responsive design for mobile, tablet, and desktop

### Intentional Bugs (For Testing)
The following bugs have been strategically injected for automated testing:

1. **Broken Image Links** (2 instances)
   - Samsung Galaxy S23 Ultra: `https://broken-image-url.com/missing-image.jpg`
   - LG OLED TV: `https://invalid-cdn.nowhere.com/missing-tv.png`

2. **Cart Calculation Error**
   - Location: `client/src/pages/Cart.tsx:54`
   - Bug: Total calculation multiplies subtotal by delivery fee instead of adding
   - Impact: Wrong order total displayed

3. **Search Functionality Broken**
   - Location: `client/src/components/Header.tsx:22-23`
   - Bug: Search callback not executed, logs console error instead
   - Impact: Search doesn't work

4. **Form Validation Bypass**
   - Location: `client/src/pages/Checkout.tsx:32-39`
   - Bug: All checkout form fields are optional (should be required)
   - Impact: Can submit empty/invalid order forms

5. **Responsive Design Break**
   - Location: `client/src/pages/Products.tsx:127`
   - Bug: Sidebar width set to 500px on tablet causing overflow
   - Impact: Layout breaks on medium screens

6. **Console Error**
   - Location: `client/src/components/ProductCard.tsx:18`
   - Bug: Accessing undefined property `product.nonExistentProperty.value`
   - Impact: Console errors on product card render

7. **UI Inconsistency**
   - Location: `client/src/components/HeroCarousel.tsx:112`
   - Bug: Carousel dots misaligned (bottom-20 left-0) with wrong colors
   - Impact: Poor visual design

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── pages/          # Main pages
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── Checkout.tsx
│   │   └── App.tsx
├── server/
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # In-memory storage
└── shared/
    └── schema.ts           # Data models
```

## API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/cart` - Get cart items with product details
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Data Models
- **Product**: name, description, price, originalPrice, category, brand, image, rating, reviewCount, inStock, badge
- **CartItem**: productId, quantity, sessionId
- `**: customerName, email, phone, address, city, state, pincode, items (JSON), total, status

## Recent Changes (October 12, 2025)
- Initial project setup with Flipkart-inspired design
- Implemented complete e-commerce flow with 12 sample products
- Added 7 intentional bugs for automated testing
- Configured blue primary theme (#2874f0) with golden offer accents
- Set up in-memory storage with seeded product data

## Running the Application
The application runs on a single server with frontend and backend integrated:
```bash
npm run dev
```
- Frontend: Vite dev server
- Backend: Express.js API
- Port: 5000 (configured in server)

## Testing Notes
This application is designed to have bugs that automated tools should detect:
- Image loading failures
- Mathematical calculation errors
- Non-functional features (search)
- Form validation issues
- Responsive design problems
- Runtime errors in console
- Visual/UI inconsistencies

Perfect for testing bug detection, automated fixes, and code quality tools.
