import type { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types.ts';
import { diaryEntries as diaries } from '../entries.ts';

export function getEntries(): DiaryEntry[] {
  return diaries;
}

export function getNonSensitivesEntries(): NonSensitiveDiaryEntry[] {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
}

export function addDiary(entry: NewDiaryEntry): DiaryEntry {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
}

export function findById(id: number): DiaryEntry | undefined {
  const entry = diaries.find(d => d.id === id);
  return entry;
}
