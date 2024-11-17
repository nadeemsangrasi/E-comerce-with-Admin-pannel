import * as z from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be greater then 10"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  brandSlug: z.string().optional(),
  catSlug: z.string().optional(),
  price: z.number().min(1, "Price is required"),
  salePrice: z.number().optional().default(0),
  totalStock: z.number().min(1, "Total Stock is required"),
  isArchive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});
