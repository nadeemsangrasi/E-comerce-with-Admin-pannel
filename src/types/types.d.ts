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
  isArchive: boolean;
  catSlug: string;
  brandSlug: string;
  images: { productId: string; imageUrl: string; createdAt; updatedAt }[];
  createdAt: string;
  updatedAt: string;
  averageReview: string;
}

export interface ICategoryBrand {
  id: string;
  name: string;
  slug: string;
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

export interface IReview {
  id: string;
  productId: string;
  userId: string;
  username: string;
  imageUrl: string;
  reviewValue: string;
  reviewMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUseUserResult {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: User | null;
  sessionId: string | null;
  signOut: () => Promise<void>;
  reload: () => Promise<void>;
}

export interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  username: string | null;
  primaryEmailAddress: {
    emailAddress: string;
    verified: boolean;
  } | null;
  primaryPhoneNumber: {
    phoneNumber: string;
    verified: boolean;
  } | null;
  profileImageUrl: string;
  hasImage: boolean;
  created: number;
  updated: number;
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
}
interface CReview {
  id: string;
  message: string;
  reviewValue: number;
}
interface IReviewCard {
  user: IUser;
  setReview: React.Dispatch<React.SetStateAction<CRevew>>;
  reviews: IReview[];
  reviewObj: IReview;
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
  setIsEdditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}
