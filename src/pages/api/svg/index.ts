import type { NextApiRequest, NextApiResponse } from 'next';
import { generateTiles } from '@/util/generateTiles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Data {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log(req.query);
  res.setHeader(`Content-Type`, `image/svg+xml`);
  const options = {
    ...req.query,
  };
  if (options.key) {
    options.key = options.key[0];
  }
  res.send(generateTiles(options)[0]);
}
