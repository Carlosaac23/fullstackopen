import { Router, type Response, type Request, type NextFunction } from 'express';
import { z } from 'zod';
import { addDiary, findById, getNonSensitivesEntries } from '../services/diary-service.ts';
import {
  NewEntrySchema,
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from '../types.ts';

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

function newDiaryParser(req: Request, res: Response, next: NextFunction) {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

function errorMiddleware(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
}

router.post(
  '/',
  newDiaryParser,
  (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = addDiary(req.body);

    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
