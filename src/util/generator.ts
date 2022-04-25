import { Container } from '@svgdotjs/svg.js';
import randomColor from 'randomcolor';
import objectHash from 'object-hash';
import { simple } from '@/generators/simple';
import { customId } from '@/util/customId';
import Redis from 'ioredis';
import { TTL } from '@/util/constants';

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

export const generator = async (
  options: GenerateTilesOptions = {},
): Promise<[string, Container | null]> => {
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
  const key = options.key || options.k;
  const id = options.id ? options.id : customId();

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
        await redis.incr(`numberOfImagesReturnedFromCache`);
        return [data, null];
      }
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

  await redis.incr(`numberOfImagesCreated`);

  if (key) {
    await redis.incr(`numberOfImagesCached`);
    delete allOptions.colors;
    const hash = objectHash(allOptions);
    await redis.set(key, hash, `EX`, TTL);
    await redis.set(hash, svg, `EX`, TTL);
  }

  return [svg, canvas];
};