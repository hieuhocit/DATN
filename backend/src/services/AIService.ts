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

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const AIService = {
  async chatWithAI(
    res: Response,
    conversation: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  ) {
    const completion = await client.chat.completions.create({
      model: models["gpt-4o-mini"],
      messages: conversation,
      store: true,
      temperature: 0.7,
      stream: true,
    });

    let message = "";

    for await (const chunk of completion) {
      const content = chunk?.choices?.[0]?.delta?.content;
      if (content) {
        message += content;
        res.write(content);
      }
    }

    conversation.push({
      role: "assistant",
      content: message,
    });

    res.end(message);
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
