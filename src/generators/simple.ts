// import { createSVGWindow } from 'svgdom';
// import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
// import { sample } from 'lodash';
// import { AllOptions } from '@/util/generator';
//
// export const simple = (options: AllOptions) => {
//   const { width, height, size, colors, bw, bc } = options;
//   const window = createSVGWindow();
//
//   const document = window.document;
//
//   registerWindow(window, document);
//
//   const canvas = SVG(document.documentElement) as Container;
//
//   if (size && width && height) {
//     for (let i = 0; i < width; i++) {
//       for (let j = 0; j < height; j++) {
//         const rect = canvas.rect(size, size);
//         rect.fill(sample(colors as any));
//         rect.stroke({
//           width: bw,
//           color: bc,
//         });
//         rect.move(i * size, j * size);
//       }
//     }
//   }
//
//   const svg = canvas.svg();
//
//   return [svg, canvas];
// };

import { AllOptions } from '@/util/generator';

import * as d3 from 'd3';

import jsdom from 'jsdom';
import { sample } from 'lodash';

const { JSDOM } = jsdom;

export const simple = (options: AllOptions) => {
  const { width, height, size, colors, bw, bc } = options;

  const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

  const body = d3.select(dom.window.document.querySelector(`body`));

  const svg = body
    .append(`svg`)
    .attr(`width`, String(width))
    .attr(`height`, String(height))
    .attr(`xmlns`, `http://www.w3.org/2000/svg`);

  if (size && width && height) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        svg
          .append(`rect`)
          .attr(`x`, i)
          .attr(`y`, j)
          .attr(`width`, String(bw))
          .attr(`height`, String(bw))
          .style(`fill`, sample(colors as any));

        // const rect = canvas.rect(size, size);
        // rect.fill(sample(colors as any));
        // rect.stroke({
        //   width: bw,
        //   color: bc,
        // });
        // rect.move(i * size, j * size);
      }
    }
  }

  return [body.html(), null];
};
