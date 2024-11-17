# Fullstack Multi-Vendor E-Commerce with Admin Dashboard

A robust fullstack e-commerce platform featuring multi-vendor support, a comprehensive admin panel, and user-friendly functionalities. The project provides seamless shopping experiences and efficient admin controls.

---

## Features

### **Admin Dashboard**
- **Dark and Light Modes**: Toggle between dark and light themes.
- **Overview**: Displays sales charts for a particular month, total revenue, total sales, and total products using server actions.
- **Product Management**:
  - Add products with multiple images.
  - Add, edit, or delete categories and brands.
- **Order Management**:
  - View all orders, delete orders, and copy order IDs.
  - Mark order status as "Paid" upon successful payment or "Unpaid" otherwise.
- **Account Management**: View and manage admin account details.

### **User Side**
- **Authentication**: 
  - Login or create an account using Clerk authentication.
- **Product Browsing**:
  - View featured sections on the homepage.
  - Browse products by category or brand.
  - Sort products by price, newest, oldest, featured, A-Z, Z-A, and more.
- **Product Details**:
  - View detailed product pages with multiple images and product information.
  - Review section for products (users can review only after purchase).
  - Similar item suggestions.
- **Account Management**: View and manage user account details.
- **Shopping Cart**:
  - Add products to the cart (up to available stock).
  - Products with zero stock are archived.
- **Checkout**:
  - Stripe-powered payment gateway.
  - Redirects to the Stripe checkout page after cart checkout.
- **Sales**: Some products may have sale prices.

---

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React Framework)
  - [shadcn/ui](https://shadcn.dev/) for UI components
  - [Lucide Icons](https://lucide.dev/) for React icons
  - [Recharts](https://recharts.org/) for sales and revenue charts
  - [Day.js](https://day.js.org/) for date manipulation
- **Authentication**: [Clerk](https://clerk.dev/)
- **File Uploads**: [Next Cloudinary](https://next-cloudinary.dev/)
- **Payment Gateway**: [Stripe](https://stripe.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **API Handling**: [Axios](https://axios-http.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

