# Fullstack E-Commerce with Admin Dashboard

A powerful fullstack e-commerce platform featuring a comprehensive admin panel, seamless user interface, and efficient backend logic. The project integrates Stripe and Clerk webhooks, along with an optimized UI powered by backend logic and local storage for a smooth and responsive experience.

---

## Features

### **Admin Dashboard**
- **Dark and Light Modes**: Toggle between dark and light themes.
- **Overview**: 
  - Displays sales charts for a particular month.
  - Shows total revenue, total sales, and total products using server actions.
- **Product Management**:
  - Add products with multiple images.
  - Add, edit, or delete categories and brands.
- **Order Management**:
  - View all orders, delete orders, and copy order IDs.
  - Automatically mark orders as "Paid" upon successful payment via Stripe webhook.
  - Mark orders as "Unpaid" for failed or incomplete payments.
- **Account Management**: View and manage admin account details.

### **User Side**
- **Authentication**: 
  - Login or create an account using Clerk authentication with Clerk webhook for user management.
- **Product Browsing**:
  - View featured sections on the homepage.
  - Browse products by category or brand.
  - Sort products by price, newest, oldest, featured, A-Z, Z-A, and more.
- **Product Details**:
  - Detailed product pages with multiple images and information.
  - Review section for products (users can review only after purchase).
  - Similar item suggestions.
- **Shopping Cart**:
  - Add products to the cart (up to available stock).
  - Optimistic UI updates with backend validation and local storage synchronization.
  - Products with zero stock are archived.
- **Checkout**:
  - Stripe-powered payment gateway.
  - Automatically update order status via Stripe webhook after payment.
- **Sales**: Some products may feature sale prices.

### **Webhooks Integration**
- **Stripe Webhook**:
  - Updates order statuses automatically based on payment events.
  - Handles successful, failed, or pending payments in real-time.
- **Clerk Webhook**:
  - Synchronizes user data and events, ensuring secure and efficient authentication flows.

---

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React Framework)
  - [shadcn/ui](https://shadcn.dev/) for UI components
  - [Lucide Icons](https://lucide.dev/) for React icons
  - [Recharts](https://recharts.org/) for sales and revenue charts
  - [Day.js](https://day.js.org/) for date manipulation
- **Authentication**: [Clerk](https://clerk.dev/) with webhooks
- **File Uploads**: [Next Cloudinary](https://next-cloudinary.dev/)
- **Payment Gateway**: [Stripe](https://stripe.com/) with webhooks
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **API Handling**: [Axios](https://axios-http.com/)
- **Optimistic UI**: Backend logic with local storage synchronization
- **Deployment**: [Vercel](https://vercel.com/)

---
