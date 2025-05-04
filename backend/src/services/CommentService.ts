// Models
import Comment, { CommentType } from "../models/Comment.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Services
import UserService from "./UserService.js";

// Types
type CreateCommentInput = Pick<
  CommentType,
  "userId" | "lessonId" | "content" | "parentId"
>;

const CommentService = {
  getAllCommentsByLessonId: async function (lessonId: string) {
    try {
      const comments = await Comment.find({
        parentId: null,
        lessonId: lessonId,
      })
        .populate({
          path: "user",
        })
        .populate({
          path: "lesson",
        })
        .populate({
          path: "children",
          populate: [
            {
              path: "user",
            },
            {
              path: "lesson",
            },
            {
              path: "children",
              populate: [
                {
                  path: "user",
                },
                {
                  path: "lesson",
                },
              ],
            },
          ],
        })
        .sort({ createdAt: -1 });
      return comments;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy danh sách bình luận",
      });
    }
  },
  createComment: async function (data: CreateCommentInput) {
    if (data.parentId) {
      const existedParentComment = await Comment.findById(data.parentId);
      if (!existedParentComment) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "ParentId không tồn tại",
        });
      }
    }

    const comment = await Comment.create(data);
    return comment;
  },
  deleteCommentByIdAndUserId: async function (id: string, userId: string) {
    try {
      const existedUser = await UserService.getUserById(userId);

      if (existedUser.role === "admin") {
        const result = await Comment.findByIdAndDelete(id);

        if (!result) {
          throw serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Không tìm thấy bình luận",
          });
        }

        return true;
      }

      const result = await Comment.findOneAndDelete({
        _id: id,
        userId: userId,
      });

      if (!result) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Không tìm thấy bình luận",
        });
      }

      return true;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy bình luận",
      });
    }
  },
  updateCommentByIdAndUserId: async function (
    id: string,
    data: Pick<CreateCommentInput, "userId" | "content">
  ) {
    const existedComment = await Comment.findOne({
      _id: id,
      userId: data.userId,
    });

    if (!existedComment) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy bình luận",
      });
    }

    Object.assign(existedComment, data);
    const comment = await existedComment.save();
    return comment;
  },
};

export default CommentService;
