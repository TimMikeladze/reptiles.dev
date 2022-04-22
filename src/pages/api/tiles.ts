import type { NextApiRequest, NextApiResponse } from 'next';
import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const window = createSVGWindow();

  const document = window.document;

  // register window and document
  registerWindow(window, document);

  // create canvas
  const canvas = SVG(document.documentElement) as Container;

  // use svg.js as normal
  canvas.rect(100, 100).fill(`yellow`).move(50, 50);
  canvas.circle(100).fill(`red`).move(50, 50);

  // get your svg as string
  console.log();
  // or
  console.log(canvas.node.outerHTML);

  res.setHeader(`Content-Type`, `image/svg+xml`);

  res.send(canvas.svg() as any);
}
