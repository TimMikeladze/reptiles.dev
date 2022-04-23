import { createSVGWindow } from 'svgdom';
import { Container, registerWindow, SVG } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';
import objectHash from 'object-hash';
import { simple } from '../generators/simple';

export interface GenerateTilesOptions {
  id?: string;
  d?: number;
  dimension?: number;
  width?: number | string;
  height?: number | string;
  w?: number | string;
  h?: number | string;
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
  type?: 'simple';
  t?: 'simple';
  colors?: string;
  cs?: string;
}

export interface AllOptions
  extends Pick<
    GenerateTilesOptions,
    | 'width'
    | 'height'
    | 'size'
    | 'count'
    | 'hue'
    | 'luminosity'
    | 'seed'
    | 'format'
    | 'alpha'
    | 'bw'
    | 'bc'
  > {
  colors?: string[] | undefined;
}

export const getRandomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const cache = new Map<string, string>();

export const toDataUrl = (svg: string): string => {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, `%27`)
    .replace(/"/g, `%22`);

  const header = `data:image/svg+xml,`;
  const dataUrl = header + encoded;

  return dataUrl;
};

export const byteLength = (str: string): number => {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
  }
  return s;
};

export const patterns: {
  [key: string]: any;
} = {
  [`simple`]: simple,
};

export const generateTiles = (
  options: GenerateTilesOptions = {},
): [string, Container | null] => {
  const width =
    options.width || options.w || options.dimension || options.d || 20;
  const height =
    options.height ||
    options.h ||
    options.dimension ||
    options.d ||
    width ||
    75;
  const size = options.size || options.s || 20;
  const count = options.count || options.c || 5;
  const hue = options.hue;
  const luminosity = options.luminosity || options.l || `random`;
  const seed = options.seed;
  const format = options.format || options.f || `hex`;
  const alpha = options.alpha || options.a;
  const bw = options.borderWidth || options.bw || 2;
  const bc = options.borderColor || options.bc || `#000`;

  const id = options.id ? options.id : null;

  const allOptions: Partial<AllOptions> = {
    width,
    height,
    size,
    count,
    hue,
    luminosity,
    seed,
    format,
    alpha,
    bw,
    bc,
  };

  if (id) {
    const hash = objectHash(allOptions);

    const data = cache.get(hash);

    if (data) {
      return [data, null];
    }
  }

  const [svg, canvas] = patterns[options.type || options.t || `simple`]({
    ...allOptions,
    colors:
      (options.colors || options.cs)?.split(`-`)?.map((x) => `#${x}`) ||
      randomColor({
        count,
        hue,
        luminosity,
        seed,
        format,
        alpha,
      }),
  });

  if (id) {
    delete allOptions.colors;
    const hash = objectHash(allOptions);
    cache.set(hash, svg);
  }

  return [svg, canvas];
};
