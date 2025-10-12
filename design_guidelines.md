# Design Guidelines: Flipkart-Style E-Commerce Testing Platform

## Design Approach

**Reference-Based Approach** - Drawing inspiration from Flipkart's established e-commerce patterns, with influences from Amazon and Shopify. This ensures familiarity for testing while maintaining professional aesthetics.

**Core Principle**: Create a recognizable e-commerce experience that mirrors Flipkart's visual language while building in testable components for bug detection scenarios.

## Color Palette

**Light Mode (Primary)**
- Primary Brand: 227 92% 55% (Flipkart blue)
- Secondary: 45 93% 47% (Golden/offer accent) 
- Success: 142 71% 45% (Purchase confirmations)
- Error: 0 84% 60% (Validation errors)
- Background: 0 0% 100% (Clean white)
- Surface: 210 17% 98% (Card backgrounds)
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%

**Dark Mode**
- Background: 222 47% 11%
- Surface: 217 33% 17%
- Adjust colors for WCAG compliance

## Typography

**Font Stack**
- Primary: 'Inter', system-ui, -apple-system, sans-serif (headings, UI)
- Secondary: 'Roboto', sans-serif (body text, descriptions)

**Scale**
- Hero/Display: text-4xl to text-6xl, font-bold
- Product Titles: text-xl to text-2xl, font-semibold
- Body: text-base, font-normal
- Captions/Meta: text-sm, font-medium
- Price Tags: text-2xl to text-3xl, font-bold

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: p-2, gap-2
- Standard: p-4, gap-4, m-6
- Section padding: py-12 to py-20
- Container: max-w-7xl mx-auto px-4

**Grid Patterns**
- Product Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
- Category Cards: grid-cols-2 md:grid-cols-4
- Cart Layout: 2-column (items + summary) on desktop

## Component Library

**Navigation**
- Sticky header with search bar (full-width on mobile)
- Category mega-menu on hover/click
- Cart icon with badge counter
- Account dropdown menu
- Blue primary background with white text

**Product Cards**
- Aspect ratio: 1:1 for images
- Border: border border-gray-200
- Shadow on hover: hover:shadow-lg transition
- Elements: Image, title (2 lines max), price, rating stars, discount badge
- Wishlist heart icon (top-right overlay)

**Hero Section**
- Multi-image carousel slider (3-5 promotional banners)
- Auto-rotate every 4 seconds
- Aspect: 21:9 on desktop, 16:9 on mobile
- Navigation dots + arrow controls

**Search & Filters**
- Prominent search bar in header
- Left sidebar filters: Category, Price Range, Brand, Rating
- Sort dropdown: Popularity, Price (Low-High), Newest
- Applied filters shown as removable chips

**Shopping Cart**
- Product thumbnail + details in rows
- Quantity stepper controls
- Remove item icon
- Sticky price summary sidebar
- Promo code input field
- Green "Place Order" CTA button

**Forms**
- Input fields: border border-gray-300, focus:ring-2 focus:ring-primary
- Labels: text-sm font-medium above inputs
- Error states: border-red-500 with error text below
- Checkout: Multi-step with progress indicator

**Buttons**
- Primary: bg-primary (blue) text-white, px-8 py-3, rounded-sm
- Secondary: border-2 border-primary text-primary
- Outline on images: backdrop-blur-sm bg-white/20 (no hover states needed)
- Icon buttons: p-2 rounded-full hover:bg-gray-100

**Rating System**
- 5-star display with filled/empty states
- Color: text-yellow-500 for stars
- Show rating number alongside (e.g., "4.2")

**Product Details**
- Image gallery: Main image + thumbnail strip
- Pinned purchase panel (desktop right side)
- Tabbed sections: Description, Specifications, Reviews
- Related products carousel at bottom

**Badges & Labels**
- Discount: bg-red-500 text-white px-2 py-1 text-xs
- "Bestseller": bg-orange-500
- "New Arrival": bg-green-500
- Position: Absolute top-2 left-2 on cards

## Images

**Required Images**
1. **Hero Carousel**: 3-5 wide promotional banners (electronics deals, fashion sales, seasonal offers) - 1920x600px min
2. **Product Images**: 200+ product photos across categories - square format, white/clean backgrounds
3. **Category Banners**: 6-8 category hero images (Electronics, Fashion, Home, etc.) - 800x300px
4. **Brand Logos**: Popular brand logos for filter section
5. **Placeholder**: Use https://placehold.co for missing/broken images (intentional bug feature)

**Image Treatment**
- Product images: object-cover with consistent aspect ratios
- Category banners: Subtle overlay for text readability
- Lazy loading for performance (may intentionally break for bug testing)

## Animations

**Minimal & Purposeful**
- Product card hover: scale-105 transform, shadow elevation
- Cart icon bounce on add-to-cart (brief pulse)
- Carousel slide: smooth translate transitions
- Loading states: Subtle skeleton screens
- NO complex scroll animations or parallax

## Responsive Breakpoints

- Mobile: < 768px (Single column, hamburger menu)
- Tablet: 768px - 1024px (2-3 column grids)
- Desktop: > 1024px (Full layout with sidebars)

## Intentional Bug Considerations

Design elements that will support bug injection:
- Complex cart calculations (ideal for math errors)
- Multi-step forms (validation bypass testing)
- Image loading states (broken link scenarios)
- Filter combinations (logic error testing)
- Responsive breakpoints (layout break testing)

**Final Note**: Maintain Flipkart's familiar blue-white-orange color story, grid-heavy layouts, and deal-focused design language while ensuring every component is testable and bug-injectable.