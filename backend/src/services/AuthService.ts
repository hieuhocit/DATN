// Models
import User, { UserType } from '../models/User.js';

// Bcrypt
import bcrypt from 'bcryptjs';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

export type UserCreateInput = Pick<
  UserType,
  'email' | 'name' | 'registerProvider'
> &
  Pick<Partial<UserType>, 'avatarUrl'> & {
    password?: string;
  };

const AuthService = {
  register: async (data: UserCreateInput) => {
    const existedUser = await User.findOne({ email: data.email });

    if (existedUser) {
      const providerMessages = {
        google:
          'Your account is connected to Google. Please log in with Google.',
        facebook:
          'Your account is connected to Facebook. Please log in with Facebook',
        default: 'Account already exists.',
      };

      const message =
        providerMessages[
          existedUser.registerProvider as keyof typeof providerMessages
        ] || providerMessages.default;

      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message,
      });
    }

    let passwordHash = '';
    if (data.password && data.registerProvider === 'local') {
      passwordHash = bcrypt.hashSync(data.password, 10);
    }

    const newUser = new User({
      email: data.email,
      name: data.name,
      passwordHash,
      avatarUrl: data.avatarUrl || '',
      registerProvider: data.registerProvider || 'local',
    });

    const result = await newUser.save();

    return result;
  },
};

export default AuthService;
