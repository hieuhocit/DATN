export type User = {
  _id: string;
  email: string;
  name: string;
  bio: string;
  avatarUrl: '';
  role: 'user' | 'instructor' | 'admin';
  registerProvider: 'local' | 'google' | 'facebook';
  createdAt: string;
  updatedAt: string;
  __v: 0;
  accessToken: string;
  refreshToken: string;
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
  author: User;
  categoryId: string;
  level: 'beginner' | 'intermediate' | 'expert' | 'all';
  duration: number;
  requirements: string;
  rating: number;
  whatYouWillLearn: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};
