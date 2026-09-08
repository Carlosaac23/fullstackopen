import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';
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

export function addDiary() {
  return null;
}
