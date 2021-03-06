import type { NextApiRequest, NextApiResponse } from 'next';
import { generator } from '@/util/generator';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const options = {
    ...req.query,
  };

  if (options.key && Array.isArray(options.key)) {
    options.key = options.key[0];
  }

  const { svg, options: allOptions } = await generator(options);

  res.setHeader(`Content-Type`, `image/svg+xml`);
  res.setHeader(
    `Content-Disposition`,
    `inline; filename=${allOptions.key}.svg`,
  );

  res.send(svg);
}
