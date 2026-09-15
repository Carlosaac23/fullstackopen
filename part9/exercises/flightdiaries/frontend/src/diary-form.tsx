import { useState } from "react";
import { createNewDiary } from "./diaries-service";
import type { Diary } from "./types";
import axios from "axios";

export default function DiaryForm({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [visibilityOptions] = useState(["great", "good", "ok", "poor"]);
  const [weather, setWeather] = useState("");
  const [weatherOptions] = useState(["sunny", "rainy", "cloudy", "stormy", "windy"]);
  const [comment, setComment] = useState("");

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const returnedDiary = await createNewDiary({ date, visibility, weather, comment });
      setDiaries((prevDiaries: Diary[]) => [...prevDiaries, returnedDiary]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.error[0].message);

        setTimeout(() => setErrorMsg(null), 3000);
      }
      console.error(error);
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>

      <p style={{ color: "red" }}>{errorMsg}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
              placeholder="Date"
            />
          </label>
        </div>
        <div>
          <label>
            Visibility
            {visibilityOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={visibility === option}
                  onChange={({ target }) => setVisibility(target.value)}
                />
                {option}
              </label>
            ))}
          </label>
        </div>
        <div>
          <label>
            Weather
            {weatherOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={weather === option}
                  onChange={({ target }) => setWeather(target.value)}
                />
                {option}
              </label>
            ))}
          </label>
        </div>
        <div>
          <label>
            Comment
            <input
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Comment"
            />
          </label>
        </div>

        <button type="submit">add</button>
      </form>
    </>
  );
}
