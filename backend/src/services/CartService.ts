// Models
import Cart, { CartType } from '../models/Cart.js';

// Slugify
import slugify from 'slugify';

// Server response
import serverResponse from '../utils/helpers/responses.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Types
type CreateCartItemInput = Pick<CartType, 'userId' | 'courseId'>;

const LessonService = {
  getCartByUserId: async function (userId: CartType['userId']) {
    const cart = await Cart.find({ userId: userId })
      .populate({
        path: 'user course',
      })
      .sort({ createdAt: -1 });
    return cart;
  },
  createCartItem: async function (data: CreateCartItemInput) {
    const existedCartItem = await Cart.findOne({
      courseId: data.courseId,
    });

    if (existedCartItem) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: 'Khoá học đã tồn tại trong giỏ hàng',
      });
    }

    const cartItem = await Cart.create(data);

    return cartItem;
  },
  deleteCartItemById: async function (id: string, userId: CartType['userId']) {
    try {
      const result = await Cart.findOneAndDelete({
        _id: id,
        userId: userId,
      });

      return !!result;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: 'Không tìm thấy khoá học trong giỏ hàng',
      });
    }
  },
};

export default LessonService;
