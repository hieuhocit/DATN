import { MessageType } from '../../types/types.js';

const serverResponse = {
  createSuccess: (message: MessageType, data: any = null) => {
    const responseMessage: MessageType & { data?: any } = { ...message };
    responseMessage.data = data;
    return responseMessage;
  },
  createError: (message: MessageType) => {
    const error: Error & { statusCode?: number; statusText?: string } =
      new Error(message.message);

    error.statusCode = message.statusCode;
    error.statusText = message.statusText;

    return error;
  },
};

export default serverResponse;
