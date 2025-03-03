import User, { UserType } from '../models/User.js';

type UserCreateType = Pick<UserType, 'email' | 'name' | 'registerProvider'> &
  Pick<Partial<UserType>, 'passwordHash' | 'avatarUrl'>;

const UserServices = {
  create: async (user: UserCreateType) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return result;
  },
  findByEmail: async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  },
};

export default UserServices;
