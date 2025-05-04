/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/configs/axiosConfig";

interface CreateNoteData {
  lessonId: string;
  courseId: string;
  content: string;
  position: number;
}

export const createNote = async (data: CreateNoteData) => {
  try {
    const response = await axios.post("/notes", data);
    return response as any;
  } catch (error) {
    return error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const response = await axios.delete(`/notes/${noteId}`);
    return response as any;
  } catch (error) {
    return error;
  }
};

export const updateNote = async (noteId: string, data: CreateNoteData) => {
  try {
    const response = await axios.put(`/notes/${noteId}`, data);
    return response as any;
  } catch (error) {
    return error;
  }
};
