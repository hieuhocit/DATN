// Models
import Note, { NoteType } from "../models/Note.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Types
type CreateNoteInput = Pick<
  NoteType,
  "userId" | "courseId" | "lessonId" | "content" | "position"
>;

const NoteService = {
  getAllNotesByCourseIdAndUserId: async function (
    courseId: string,
    userId: string
  ) {
    try {
      const notes = await Note.find({
        userId: userId,
        courseId: courseId,
      })
        .populate({
          path: "user course lesson",
        })
        .sort({ createdAt: -1 });
      return notes;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy ghi chú",
      });
    }
  },
  getAllNotesByLessonIdAndUserId: async function (
    lessonId: string,
    userId: string
  ) {
    try {
      const notes = await Note.find({
        userId: userId,
        lessonId: lessonId,
      })
        .populate({
          path: "user course lesson",
        })
        .sort({ createdAt: -1 });
      return notes;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy ghi chú",
      });
    }
  },
  createNote: async function (data: CreateNoteInput) {
    const existedNote = await Note.findOne({
      userId: data.userId,
      lessonId: data.lessonId,
      courseId: data.courseId,
      position: data.position,
    });

    if (existedNote) {
      return await this.updateNoteById(existedNote._id.toString(), data);
    }

    const note = await Note.create(data);

    return note;
  },
  deleteNoteByIdAndUserId: async function (id: string, userId: string) {
    try {
      await Note.findOneAndDelete({
        _id: id,
        userId: userId,
      });
      return true;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy ghi chú",
      });
    }
  },
  updateNoteById: async function (id: string, data: CreateNoteInput) {
    const existedNote = await Note.findById(id);

    if (!existedNote) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy ghi chú",
      });
    }

    Object.assign(existedNote, data);

    const note = await existedNote.save();

    return note;
  },
};

export default NoteService;
