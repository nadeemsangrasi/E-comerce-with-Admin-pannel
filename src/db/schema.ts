import {
  timestamp,
  pgTable,
  varchar,
  serial,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  clerkId: varchar("clerk_id", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productTable = pgTable("product", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  salePrice: integer("sale_price"),
  totalStock: integer("total_stock").notNull(),
  averageReview: integer("average_review"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.clerkId),
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id),
  productTitle: varchar("product_title", { length: 256 }).notNull(),
  productImage: varchar("product_image", { length: 256 }),
  productPrice: integer("product_price").notNull(),
  productSalePrice: integer("product_sale_price"),
  quantity: integer("quantity").notNull(),
  productStock: integer("product_stock").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  categoryName: varchar("category_name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const brandTable = pgTable("brand", {
  id: serial("id").primaryKey(),
  brandName: varchar("brand_name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
