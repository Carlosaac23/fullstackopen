import type { Response, Request } from 'express';
import { Router } from 'express';
import type { NonSensitiveDiaryEntry } from '../types.ts';
import { getNonSensitivesEntries } from '../services/diary-service.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(getNonSensitivesEntries());
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Saving a diary!');
});

export default router;
