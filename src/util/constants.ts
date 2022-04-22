export const PRODUCTION_DOMAIN = `reptiles.dev`;

export const PREVIEW_DOMAIN = `reptiles.vercel.app`;

export const RATE_LIMIT_WINDOW = `1m`;

export const RATE_LIMIT_MAX = 10;

export const DEFAULT_QUERY = `{
  svg(options: {
    hue: "green"
    luminosity: "dark"
  }){
    url
    data
  }
}
`;
