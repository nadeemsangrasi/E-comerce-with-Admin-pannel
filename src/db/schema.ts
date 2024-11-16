import {
  timestamp,
  pgTable,
  varchar,
  serial,
  text,
  integer,
  boolean,
  numeric,
  json,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  clerkId: varchar("clerk_id", { length: 255 }).notNull().primaryKey().unique(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const productTable = pgTable("product", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 255 }).notNull(),
  catSlug: varchar("cat_slug", { length: 255 }).notNull(),
  brandSlug: varchar("brand_slug", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  salePrice: integer("sale_price"),
  totalStock: integer("total_stock").notNull(),
  averageReview: numeric("average_review", { precision: 2, scale: 1 }),
  isArchive: boolean("is_archive").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const productImageTable = pgTable("product_image", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const reviewTable = pgTable("review", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.clerkId, { onDelete: "cascade" }),
  username: varchar("username", { length: 255 }).notNull(),
  imageUrl: text("imageurl").notNull(),
  reviewValue: integer("review_value").notNull(),
  reviewMessage: text("review_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("category_name", { length: 255 }).notNull().unique(),
  slug: varchar("cat_slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const brandTable = pgTable("brand", {
  id: serial("id").primaryKey(),
  name: varchar("brand_name", { length: 255 }).notNull().unique(),
  slug: varchar("brand_slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.clerkId, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  productTitle: varchar("product_title", { length: 256 }).notNull(),
  productImage: varchar("product_image", { length: 256 }),
  productPrice: integer("product_price").notNull(),
  productSalePrice: integer("product_sale_price"),
  quantity: integer("quantity").notNull(),
  productStock: integer("product_stock").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const orderTable = pgTable("order", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.clerkId, { onDelete: "cascade" }),
  isPaid: boolean("is_paid").notNull().default(false),
  phone: varchar("phone", { length: 255 }),
  address: varchar("address", { length: 255 }),
  totalPrice: numeric("total_price").notNull().default("0"),
  products: json("products").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const orderItemTable = pgTable("order_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orderTable.id, { onDelete: "cascade" }), // Cascade when order is deleted
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }), // Cascade when product is deleted
  price: integer("price").notNull(),
  salePrice: integer("sale_price"),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
