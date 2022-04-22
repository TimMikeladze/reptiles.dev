import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';

const getRandomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface GenerateSvgProps {
  width?: number;
  height?: number;
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
}

export const generateTiles = (props: GenerateSvgProps) => {
  const window = createSVGWindow();

  const document = window.document;

  registerWindow(window, document);

  const canvas = SVG(document.documentElement) as Container;

  const width = Number(props.width) || 200;
  const height = Number(props.height) || 200;
  const size = Number(props.size) || 50;
  const count = Number(props.count) || 3;
  const hue = props.hue;
  const luminosity = props.luminosity || `light`;
  const seed = props.seed;
  const format = props.format || `hex`;
  const alpha = props.alpha;

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
        width: props.borderWidth || 2,
        color: props.borderColor || `#000`,
      });
      rect.move(i * size, j * size);
    }
  }

  return canvas;
};
