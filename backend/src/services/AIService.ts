// OpenAI
import OpenAI from "openai";

// Google Gen AI
import { GoogleGenAI, Type } from "@google/genai";

// AI Models
import { models } from "../utils/enum/ai-models.js";

// Types
import { Response } from "express";

import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import serverResponse from "../utils/helpers/responses.js";
import messages from "../configs/messagesConfig.js";
import Category from "../models/Category.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const AIService = {
  async chatWithAI({
    courseId,
    lessonId,
    userId,
    message,
  }: {
    lessonId: string;
    courseId: string;
    userId: string;
    message: string;
  }) {
    const currentLesson = await Lesson.findById(lessonId);

    if (!currentLesson) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Bài học không tồn tại",
      });
    }

    const currentCourse = await Course.findById(courseId);

    if (!currentCourse) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Khóa học không tồn tại",
      });
    }

    const enrollments = await Enrollment.find({
      userId: userId,
    });

    const lessons = await Lesson.find({
      courseId: currentCourse._id,
    });

    const category = await Category.findById(currentCourse.categoryId);

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Thông tin về các khoá học mà người dùng đã tham gia:
                      ${"```json"}
                      ${JSON.stringify(enrollments, null, 2)}
                      ${"```"}
                    `,
            },
            {
              text: `Thông tin về tất cả các bài học trong khoá học này: 
                      ${"```json"}
                      ${JSON.stringify(lessons, null, 2)}
                      ${"```"}
                    `,
            },
            {
              text: `Thông tin về khoá học người dùng đang học:
                      Tiêu đề: ${currentCourse.title}
                      Mô tả: ${currentCourse.description}
                      Danh much: ${category?.name}
                    `,
            },
            {
              text: `Thông tin về bài học người dùng đang học:
                      Tiêu đề: ${currentLesson.title}
                      Mô tả: ${currentLesson.description}
                    `,
            },

            {
              text: `Bạn sẽ dựa vào những thông tin trên để trả lời câu hỏi của người dùng nhé. Nếu như câu hỏi vượt quá phạm vi của khoá học hoặc bài học này, bạn hãy từ chối trả lời. Khi trả lời, hãy render trực tiếp dưới dạng **Markdown**.`,
            },
          ],
        },
      ],
      config: {
        systemInstruction: `
          Bạn là Trợ lý học tập, một trợ lý học tập chuyên về môn ${category?.name} trong khóa học "${currentCourse.title}".
          Bạn có nhiệm vụ giải đáp các thắc mắc của học viên liên quan đến nội dung bài học "${currentLesson.title}".

          Hãy sử dụng thông tin về khóa học và bài học đã được cung cấp trong lịch sử trò chuyện để trả lời câu hỏi của người dùng.
          Khi trả lời, hãy render trực tiếp dưới dạng **Markdown**.
          Nếu câu hỏi không liên quan trực tiếp đến nội dung của bài học "${currentLesson.title}" hoặc vượt ra ngoài phạm vi của khóa học "${currentCourse.title}", hãy lịch sự từ chối trả lời.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            result: {
              type: Type.STRING,
            },
          },
        },
      },
    });

    const response = await chat.sendMessage({
      message: message,
    });

    let data: {
      result: string;
    } = {
      result: "",
    };

    try {
      data = JSON.parse(response.text ?? "[]");
    } catch (error) {
      data = { result: "" };
    }

    return data.result;
  },
  async recommendCourses(userId: string) {
    const enrollments = await Enrollment.find({
      userId: userId,
    }).populate("course");

    const enrolledCourses = enrollments.map(
      (enrollment: any) => enrollment.course?.[0]
    );

    const courses = await Course.find({
      _id: { $nin: enrolledCourses.map((course) => course._id) },
    });

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Bạn là một tư vấn viên giáo dục trên nền tảng trực tuyến của EduGenius",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Đúng vậy, tôi là tư vấn vên của nền tảng trực tuyến của EduGenius",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `Dưới đây là danh sách các khoá học mà tôi đã tham gia: 
                ${"```json"}
                ${JSON.stringify(enrolledCourses, null, 2)}
                ${"```"}
              `,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Được rồi, tôi đã hiểu. Tôi đã biết bạn đã tham gia những khoá học nào.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `Dưới đây là danh sách các khoá học khác trong nền tảng mà tôi chưa tham gia: 
                ${"```json"}
                ${JSON.stringify(courses, null, 2)}
                ${"```"}
              `,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Được rồi, tôi đã hiểu. Tôi sẽ chỉ trả lời trong phạm vi các khoá học này.",
            },
          ],
        },
      ],
      config: {
        systemInstruction:
          "Bạn là một tư vấn viên giáo dục trên nền tảng trực tuyến của EduGenius. Và tên của bạn là Thầy Giáo Ba",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              courseId: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    });

    const response = await chat.sendMessage({
      message:
        "Hãy tư vấn cho tôi một số khóa học mà tôi có thể tham gia dựa trên danh sách khóa học mà tôi đã tham gia và chưa tham gia ở trên. Hãy trả lời ít nhất 5 khoá học nhé, và bạn chỉ cần đưa ra id của khoá học thôi nhé.",
    });

    let data: {
      courseId: string;
    }[] = [];

    try {
      data = JSON.parse(response.text ?? "[]");
    } catch (error) {
      data = [];
    }

    const courseIds = data.map((item) => item.courseId);

    return courseIds as string[];
  },
};

export default AIService;
