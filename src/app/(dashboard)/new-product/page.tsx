"use client";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { Trash, Upload } from "lucide-react";
import React, { useState } from "react";
import img from "@/assets/home-4.jpg";
import Image from "next/image";
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
import { brand, category } from "@/data/data";
import { CheckBox } from "@/components/shared/CheckBox";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/shared/UploadImage";

type CreateProductFormData = z.infer<typeof createProductSchema>;

const NewProduct = () => {
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: undefined,
      salePrice: undefined,
      totalStock: undefined,
      isArchived: false,
      isFeatured: false,
    },
  });

  const onCreateProductSubmit = (data: CreateProductFormData) => {
    console.log(data);
    form.reset();
  };
  const [image, setImage] = useState<string[]>([]);

  return (
    <DashboardPagesWrapper>
      <div className="space-y-4">
        <div>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
            Create Product
          </h1>
          <h4 className="text-gray-500 text-base font-medium dark:text-gray-400 mb-1">
            Fill out the form below to create a new product
          </h4>
          <hr />
        </div>
        {/* upload image  */}
        <UploadImage
          onChange={setImage}
          onRemove={(url) => setImage(image.filter((i) => i !== url))}
          value={image}
        />

        {/* Product Form Section */}
        <div className="pt-3 w-3/5">
          <FormProvider {...form}>
            {" "}
            {/* Wrap with FormProvider */}
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
                            data={category}
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
                            data={brand}
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

              <Button type="submit" className="w-full mt-5">
                Create
              </Button>
            </form>
          </FormProvider>{" "}
          {/* Ensure FormProvider wraps all form components */}
        </div>
      </div>
    </DashboardPagesWrapper>
  );
};

export default NewProduct;
