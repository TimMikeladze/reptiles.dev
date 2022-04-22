import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';

const getRandomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface GenerateSvgProps {
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

export const generateTiles = (props: GenerateSvgProps = {}) => {
  const window = createSVGWindow();

  const document = window.document;

  registerWindow(window, document);

  const canvas = SVG(document.documentElement) as Container;

  const width = props.width || props.d || 200;
  const height = props.height || props.d || 200;
  const size = props.size || props.s || 50;
  const count = props.count || props.c || 3;
  const hue = props.hue || props.h;
  const luminosity = props.luminosity || props.l || `random`;
  const seed = props.seed;
  const format = props.format || props.f || `hex`;
  const alpha = props.alpha || props.a;
  const bw = props.borderWidth || props.bw || 2;
  const bc = props.borderColor || props.bc || `#000`;

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
