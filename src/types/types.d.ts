import React from "react";

export interface IUploadImageProps {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  value: string[];
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  totalStock: number;
  salePrice: number;
  isFeatured: boolean;
  isArchived: boolean;
  images: { productId: string; imageUrl: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryBrand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type IOrder = {
  id: string;
  products: string[];
  phone: number;
  address: string;
  totalPrice: string;
  isPaid: boolean;
};

interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  loading: boolean;
  categories: ICategoryBrand[];
  setCategories: React.Dispatch<React.SetStateAction<ICategoryBrand[]>>;
  catLoading: boolean;
  brands: ICategoryBrand[];
  setBrands: React.Dispatch<React.SetStateAction<ICategoryBrand[]>>;
  brandLoading: boolean;
  orderLoading: boolean;
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  orders: IOrder[];
  cart: ICart[];

  addToCart: (item: IProduct) => void;
  removeFromCart: (itemId: string) => void;
  totalAmount: number;
  isCartLoading: boolean;
  handleCartIncrement: (id: string) => void;
  handleCartDecrement: (id: string) => void;
}

export interface ICart {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  productSalePrice: number;
  quantity: number;
  productStock: number;
}
