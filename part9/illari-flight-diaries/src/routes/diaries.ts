import type { Response, Request } from 'express';
import { Router } from 'express';
import type { NonSensitiveDiaryEntry } from '../types.ts';
import { addDiary, findById, getNonSensitivesEntries } from '../services/diary-service.ts';
import { parseNewDiaryEntry } from '../utils.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(getNonSensitivesEntries());
});

router.get('/:id', (req: Request, res: Response) => {
  const diary = findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    console.log('body', req.body);
    const newDiaryEntry = parseNewDiaryEntry(req.body);
    const addedEntry = addDiary(newDiaryEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
