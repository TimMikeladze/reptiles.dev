import { Container } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';
import objectHash from 'object-hash';
import { simple } from '@/generators/simple';
import { customId } from '@/util/customId';
import Redis from 'ioredis';
import {
  MAX_BORDER_WIDTH,
  MAX_COLORS,
  MAX_DIMENSION,
  MAX_SIZE,
  TTL,
} from '@/util/constants';
import { optimize } from 'svgo';

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
  key?: string;
  k?: string;
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
    | 'key'
    | 'id'
  > {
  colors?: string[] | undefined;
}

const redis = new Redis(process.env.REDIS_URL as string);

const fixHexColorString = (color: string): string =>
  !color.startsWith(`#`) ? `#${color}` : color;

export const toDataUrl = (svg: string): string => {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, `%27`)
    .replace(/"/g, `%22`);

  const header = `data:image/svg+xml,`;
  const dataUrl = header + encoded;

  return dataUrl;
};

export const patterns: {
  [key: string]: any;
} = {
  [`simple`]: simple,
};

export interface GeneratorReturn {
  svg: string;
  canvas: Container | null;
  options: AllOptions;
}

export const generator = async (
  options: GenerateTilesOptions = {},
): Promise<GeneratorReturn> => {
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
  let key = options.key || options.k;
  const id = options.id ? options.id : customId();

  const customCount = options.count || options.c;
  const customColors = options.colors || options.cs;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    throw new Error(`Dimensions must be no greater than ${MAX_DIMENSION}`);
  }

  if (size > MAX_SIZE) {
    throw new Error(`Size must be no greater than ${MAX_SIZE}`);
  }

  if (bw > MAX_SIZE) {
    throw new Error(`Border width must be no greater than ${MAX_BORDER_WIDTH}`);
  }

  if (count > MAX_COLORS) {
    throw new Error(`Color count must be no greater than ${MAX_COLORS}`);
  }

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
    id,
  };

  if (key) {
    const hash = await redis.get(key);

    if (hash) {
      const data = await redis.get(hash);

      if (data) {
        allOptions.key = key;
        await redis.incr(`numberOfImagesReturnedFromCache`);
        return { svg: data, canvas: null, options: allOptions };
      }
    }
  }

  if (!key) {
    key = customId();
  }

  allOptions.key = key;

  let colors: string[] =
    (options.colors || options.cs)?.split(`-`)?.map(fixHexColorString) ||
    randomColor({
      count,
      hue,
      luminosity,
      seed,
      format,
      alpha,
    });

  if (customColors && customCount && count > colors.length) {
    const countDiff = count - colors.length;
    colors = [
      ...colors,
      ...randomColor({
        count: countDiff,
        hue,
        luminosity,
        seed,
        format,
        alpha,
      }),
    ];
  }

  const [svg, canvas] = patterns[options.type || options.t || `simple`]({
    ...allOptions,
    colors,
  });

  const optimized: any = optimize(svg, {
    multipass: true,
  });

  await redis.incr(`numberOfImagesCached`);

  delete allOptions.colors;
  const hash = objectHash(allOptions);

  await redis.set(key, hash, `EX`, TTL);
  await redis.set(hash, optimized.data, `EX`, TTL);

  return { svg: optimized.data, canvas, options: allOptions };
};
