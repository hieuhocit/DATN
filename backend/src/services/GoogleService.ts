// Call APIs
import axios from 'axios';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Message config
import messages from '../configs/messagesConfig.js';

export type GoogleUserInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

const GoogleService = {
  getUserInfo: async (googleAccessToken: string): Promise<GoogleUserInfo> => {
    try {
      const userInfo = (await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${googleAccessToken}` } }
      )) as { data: GoogleUserInfo };
      return userInfo.data;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Invalid Google access token',
      });
    }
  },
};

export default GoogleService;
