export type User = {
  _id: string;
  email: string;
  name: string;
  bio: string;
  avatarUrl: string;
  role: "user" | "instructor" | "admin";
  registerProvider: "local" | "google" | "facebook";
  createdAt: string;
  updatedAt: string;
  __v: number;
  accessToken: string;
  refreshToken: string;
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  thumbnail: string;
  instructorId: string;
  categoryId: string;
  level: string;
  duration: number;
  requirements: string;
  whatYouWillLearn: string;
  isPublished: boolean;
  enrollmentCount?: number;
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  instructor: User[];
  category: Category[];
};

export interface Review {
  _id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
    avatarUrl: string;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  children?: Category[];
}
