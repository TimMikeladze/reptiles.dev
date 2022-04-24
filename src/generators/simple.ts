import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
import { sample } from 'lodash';
import { AllOptions } from '@/util/generator';

export const simple = (options: AllOptions) => {
  const { width, height, size, colors, bw, bc } = options;
  const window = createSVGWindow();

  const document = window.document;

  registerWindow(window, document);

  const canvas = SVG(document.documentElement) as Container;

  if (size && width && height) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const rect = canvas.rect(size, size);
        rect.fill(sample(colors as any));
        rect.stroke({
          width: bw,
          color: bc,
        });
        rect.move(i * size, j * size);
      }
    }
  }

  const svg = canvas.svg();

  return [svg, canvas];
};
