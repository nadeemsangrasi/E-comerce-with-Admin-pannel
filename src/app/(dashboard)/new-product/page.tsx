"use client";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProductSchema } from "@/schemas/CreateProductSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@/components/shared/SelectItem";

import { CheckBox } from "@/components/shared/CheckBox";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/shared/UploadImage";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { IProduct } from "@/types/types";
import { slugify } from "@/utils/slugify";

type CreateProductFormData = z.infer<typeof createProductSchema>;

const NewProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { products, setProducts, categories, brands } = useProductContext();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmiting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const product: IProduct | undefined = products.find(
    (p) => parseInt(p.id) === parseInt(productId || "")
  );

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
      brand: product?.brand || "",
      catSlug: product?.catSlug || "",
      brandSlug: product?.brandSlug || "",
      price: product ? Number(product.price) : 99.9,
      salePrice: product ? Number(product.salePrice) : 0,
      totalStock: product ? Number(product.totalStock) : 1,
      isArchived: product?.isArchived || false,
      isFeatured: product?.isFeatured || false,
    },
  });

  useEffect(() => {
    if (product) {
      setImages(product.images.map((img) => img.imageUrl));
    }
  }, [productId, product, form]);

  const onCreateProductSubmit = async (data: CreateProductFormData) => {
    if (images.length > 0) {
      setIsSubmitting(true);
      try {
        const res = productId
          ? await axios.patch("/api/product", {
              ...data,
              productId,
              brandSlug: slugify(data.brand),
              catSlug: slugify(data.category),
            })
          : await axios.post("/api/product", {
              ...data,
              brandSlug: slugify(data.brand),
              catSlug: slugify(data.category),
            });

        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
          return;
        }

        const imgData = images.map((img) => ({
          productId: res.data.data.id,
          imageUrl: img,
        }));

        const imgRes = productId
          ? await axios.patch("/api/product-images", { images: imgData })
          : await axios.post("/api/product-images", { images: imgData });

        if (imgRes.status !== 200) {
          console.error(imgRes.data.message);
          toast.error(imgRes.data.message);
          return;
        }

        setProducts((prevProducts) => {
          let updatedProducts;

          if (productId) {
            updatedProducts = prevProducts.map((product) =>
              product.id.toString() === productId.toString()
                ? {
                    ...product,
                    ...res.data.data,
                    price: Number(data.price),
                    salePrice: Number(data.salePrice),
                    totalStock: Number(data.totalStock),
                    images: imgData,
                  }
                : product
            );
          } else {
            updatedProducts = [
              ...prevProducts,
              {
                ...res.data.data,
                price: Number(data.price),
                salePrice: Number(data.salePrice),
                totalStock: Number(data.totalStock),
                images: imgData,
              },
            ];
          }

          return updatedProducts;
        });

        router.replace("/admin-products");
        toast.success(res.data.message);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
        const errorMessage = axiosError?.response?.data as { message: string };
        toast.error(errorMessage?.message || "An error occurred");
      } finally {
        setIsSubmitting(false);
        setImages([]);
        form.reset();
      }
    } else {
      toast.error("Please upload an image");
    }
  };

  return (
    <DashboardPagesWrapper>
      <div className="space-y-4">
        <div>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
            {productId ? "Edit Product" : "Create Product"}
          </h1>
          <h4 className="text-gray-500 text-base font-medium dark:text-gray-400 mb-1">
            {productId
              ? "Update the form below to edit the product"
              : "Fill out the form below to create a new product"}
          </h4>
          <hr />
        </div>
        <UploadImage onChange={setImages} value={images} />
        <div className="pt-3 w-3/5">
          <FormProvider {...form}>
            {" "}
            <form onSubmit={form.handleSubmit(onCreateProductSubmit)}>
              {/* Title and Total Stock Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total Stock..."
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Price and Sale Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price..."
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Sale Price..."
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Featured and Archived Checkboxes */}
              <div className="flex items-center gap-4 mt-4">
                <div className="p-3 border rounded-md">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CheckBox
                            label="Featured"
                            value={field.value as boolean}
                            setValue={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Featured product will show on the homepage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-3 border rounded-md">
                  <FormField
                    control={form.control}
                    name="isArchived"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CheckBox
                            label="Archived"
                            value={field.value as boolean}
                            setValue={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Archived product will not be displayed on any page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Category and Brand Select Items */}
              <div className="flex items-center mt-4 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SelectItem
                            selectLabel="Select Category"
                            data={categories}
                            value={field.value}
                            setValue={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SelectItem
                            selectLabel="Select Brand"
                            data={brands}
                            value={field.value}
                            setValue={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-5"
                disabled={
                  isSubmiting || !form.formState.isValid || images.length === 0
                }
              >
                {isSubmiting
                  ? productId
                    ? "Saving..."
                    : "Creating..."
                  : productId
                  ? "Save Changes"
                  : "Create"}
              </Button>
            </form>
          </FormProvider>{" "}
        </div>
      </div>
    </DashboardPagesWrapper>
  );
};

export default NewProduct;
