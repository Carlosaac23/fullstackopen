import { Weather, Visibility, type NewDiaryEntry } from './types.ts';

export function parseNewDiaryEntry(object: unknown): NewDiaryEntry {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'weather' in object && 'visibility' in object && 'comment' in object) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function parseComment(comment: unknown): string {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
}

function isWeather(param: string): param is Weather {
  return (Object.values(Weather) as string[]).includes(param);
}

function parseWeather(weather: unknown): Weather {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }

  return weather;
}

function isVisibility(param: string): param is Visibility {
  return (Object.values(Visibility) as string[]).includes(param);
}

function parseVisibility(visibility: unknown): Visibility {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }

  return visibility;
}
