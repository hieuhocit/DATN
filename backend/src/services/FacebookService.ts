// Call APIs
import axios from 'axios';

// Server response
import serverResponse from '../utils/helpers/responses.js';

// Message config
import messages from '../configs/messagesConfig.js';

export type FacebookUserInfo = {
  id: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
};

const FaceService = {
  getUserInfo: async (
    facebookAccessToken: string
  ): Promise<FacebookUserInfo> => {
    try {
      const response = (await axios.get('https://graph.facebook.com/v22.0/me', {
        params: {
          fields: 'id,name,email,first_name,last_name,picture',
          access_token: facebookAccessToken,
        },
      })) as { data: FacebookUserInfo };
      return response.data;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Invalid Facebook access token',
      });
    }
  },
};

export default FaceService;
