import { useEffect, useState } from "react";
import { getAllDiaries } from "./diaries-service";
import type { Diary } from "./types";
import DiaryForm from "./diary-form";

export default function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((initialDiaries) => setDiaries(initialDiaries));
  }, []);

  return (
    <div>
      <DiaryForm setDiaries={setDiaries} />

      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <p>
              <strong>Date:</strong> {diary.date}
            </p>
            <p>
              <strong>Visibility:</strong> {diary.visibility}
            </p>
            <p>
              <strong>Weather:</strong> {diary.weather}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
