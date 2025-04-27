// OpenAI
import OpenAI from "openai";

// AI Models
import { models } from "../utils/enum/ai-models.js";

// Types
import { Response } from "express";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

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
};

export default AIService;
