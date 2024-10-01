import { timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

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
