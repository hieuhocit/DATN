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
