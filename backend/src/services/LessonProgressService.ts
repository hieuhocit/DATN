// Models
import LessonProgress, {
  LessonProgressType,
} from "../models/LessonProgress.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Services
import LessonService from "./LessonService.js";

// Types
type CreateLessonProgressInput = Pick<
  LessonProgressType,
  "userId" | "lessonId"
>;

type UpdateLessonProgressInput = Pick<
  LessonProgressType,
  "progress" | "lastWatchPosition"
>;

const LessonProgressService = {
  getAllLessonProgressesByUserId: async function (
    userId: LessonProgressType["userId"]
  ) {
    const lessonProgresses = await LessonProgress.find({
      userId: userId,
    })
      .populate({
        path: "user lesson",
      })
      .sort({ createdAt: -1 });
    return lessonProgresses;
  },
  getLessonProgressById: async function (id: string) {
    const lessonProgress = await LessonProgress.findById(id)
      .populate({ path: "user lesson" })
      .sort({ createdAt: -1 });

    if (!lessonProgress) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy tiến trình bài học",
      });
    }

    return lessonProgress;
  },
  createLessonProgress: async function (data: CreateLessonProgressInput) {
    await LessonService.getLessonById(data.lessonId?.toString() as string);

    const existedLessonProgress = await LessonProgress.findOne({
      userId: data.userId,
      lessonId: data.lessonId,
    });

    if (existedLessonProgress) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: "Tiến trình bài học đã tồn tại",
      });
    }

    const lessonProgress = await LessonProgress.create(data);

    return lessonProgress;
  },
  updateLessonProgressById: async function (
    id: string,
    data: UpdateLessonProgressInput
  ) {
    const existedLessonProgress = await this.getLessonProgressById(id);

    if (!existedLessonProgress) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy tiến trình bài học",
      });
    }

    let isCompleted = existedLessonProgress.isCompleted;

    if (data.progress >= 100) {
      isCompleted = true;
    }

    existedLessonProgress.progress = data.progress;
    existedLessonProgress.lastWatchPosition = data.lastWatchPosition;
    existedLessonProgress.isCompleted = isCompleted;

    await existedLessonProgress.save();

    return existedLessonProgress;
  },
};

export default LessonProgressService;
