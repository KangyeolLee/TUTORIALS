export interface shoppingCartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  isChekced: boolean;
  deliveryFee: number;
  discount: number;
}

export interface IUser {
  id: number;
  user_id: string;
  name: string;
}

export interface IProductImage {
  createdAt: string;
  updatedAt: string;
  id: number;
  url: string;
  isThumbnail: number;
  type: string;
  product_id: number;
}

export interface IProduct {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  price: number;
  content: string | null;
  stock: number;
  sub_category_id: number;
  productImage: IProductImage[];
}

export interface ICart {
  count: number;
  createdAt: string;
  productId: number;
  title: string;
  price: number;
  image: string;
}

export interface IDetails {
  content: {
    details: string;
    essentials: string;
  };
  createdAt: string;
  id: number;
  price: string;
  stock: number;
  sub_category_id: number;
  title: string;
}

export interface IThumbnails {
  id: number;
  isThumbnail: number;
  type: string;
  product_id: number;
  url: string;
  targetId: string;
}

export interface IProductDetail {
  details: IDetails;
  thumbnails: IThumbnails[];
}

export type IReview = FormData;

export type IRating = {
  rating: number;
  count: string;
};

export interface IReviewCountAndRating {
  count: number;
  sum: string;
  ratings: IRating[];
}

export interface IProductReview {
  id: number;
  content: string;
  rating: number;
  name: string;
  createdAt: string;
  url: string[];
}

export interface ISignUpUser {
  user_id: string;
  password: string;
  rePassword: string;
  name: string;
}

export interface IGithubUrl {
  githubUrl: string;
}

export interface ILoginUser {
  user_id: string;
  password: string;
}

export interface ISearchData {
  id: number;
  price: number;
  image: string;
  title: string;
}

export interface IAddress {
  name: string | undefined;
  postcode: string;
  address: string;
  detailAddress: string;
  phone: string;
  isDefault: boolean;
  userId?: number;
  id?: number;
}
export interface ICategory {
  id: number;
  title: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  id: number;
  title: string;
}

export interface IBookmarkProduct {
  productId: number;
  title: string;
  price: number;
  image: string;
}

export interface IOrderProduct {
  id: number;
  title: string;
  price: number;
  img: string;
  count: number;
}

export interface IOrderPost {
  products: { id: number; count: number }[];
  addressId?: string | null;
  status: string;
  deliveryRequestMessage?: string;
}

export interface IOrder {
  id: number;
  products: IOrderProduct[];
  status: string;
  address_id: number;
  user_id: number;
  delivery_request_message: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
