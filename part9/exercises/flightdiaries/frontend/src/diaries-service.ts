import axios from "axios";
import type { Diary, NewDiary } from "./types";

const baseUrl = "/api/diaries";

export async function getAllDiaries() {
  return await axios<Diary[]>(baseUrl).then((res) => res.data);
}

export async function createNewDiary(payload: NewDiary) {
  try {
    return await axios.post(baseUrl, payload).then((res) => res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      console.error(error);
    }
  }
}
