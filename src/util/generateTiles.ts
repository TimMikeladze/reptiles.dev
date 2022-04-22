import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';

const getRandomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface GenerateTilesOptions {
  d?: number;
  width?: number | string;
  height?: number | string;
  size?: number;
  count?: number;
  hue?: number | string;
  luminosity?: 'bright' | 'light' | 'dark' | 'random';
  seed?: string;
  format?:
    | 'hsvArray'
    | 'hslArray'
    | 'hsl'
    | 'hsla'
    | 'rgbArray'
    | 'rgb'
    | 'rgba'
    | 'hex';
  alpha?: number;
  borderWidth?: number;
  borderColor?: string;

  s?: number;
  c?: number;
  h?: number | string;
  l?: 'bright' | 'light' | 'dark' | 'random';
  f?:
    | 'hsvArray'
    | 'hslArray'
    | 'hsl'
    | 'hsla'
    | 'rgbArray'
    | 'rgb'
    | 'rgba'
    | 'hex';
  a?: number;
  bw?: number;
  bc?: string;
}

export const generateTiles = (options: GenerateTilesOptions = {}) => {
  const window = createSVGWindow();

  const document = window.document;

  registerWindow(window, document);

  const canvas = SVG(document.documentElement) as Container;

  const width = options.width || options.d || 100;
  const height = options.height || options.d || 100;
  const size = options.size || options.s || 50;
  const count = options.count || options.c || 5;
  const hue = options.hue || options.h;
  const luminosity = options.luminosity || options.l || `random`;
  const seed = options.seed;
  const format = options.format || options.f || `hex`;
  const alpha = options.alpha || options.a;
  const bw = options.borderWidth || options.bw || 2;
  const bc = options.borderColor || options.bc || `#000`;

  const colors = randomColor({
    count,
    hue,
    luminosity,
    seed,
    format,
    alpha,
  });

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const rect = canvas.rect(size, size);
      rect.fill(getRandomElement(colors));
      rect.stroke({
        width: bw,
        color: bc,
      });
      rect.move(i * size, j * size);
    }
  }

  return canvas;
};

export const toDataUrl = (canvas: Container) => {
  const encoded = encodeURIComponent(canvas.svg())
    .replace(/'/g, `%27`)
    .replace(/"/g, `%22`);

  const header = `data:image/svg+xml,`;
  const dataUrl = header + encoded;

  return dataUrl;
};
