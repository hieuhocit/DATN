// Models
import User from '../models/User.js';

const UserService = {
  me: async function (email: string) {
    const user = await User.findOne({ email });
    return user;
  },
  updateProfile: async function () {},
};

export default UserService;
