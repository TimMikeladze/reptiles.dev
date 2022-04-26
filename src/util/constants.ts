export const SITE_NAME = `reptiles`;

export const SITE_DESCRIPTION = `Generate colorful and temporarily identifiable SVGs with unique urls.`;

export const SITE_TITLE = `reptiles.dev - ${SITE_DESCRIPTION}`;

export const LOC_URL = `https://linesofcode.dev`;

export const REPO_URL = `https://github.com/TimMikeladze/reptiles.dev`;

export const PRODUCTION_DOMAIN = `reptiles.dev`;

export const PREVIEW_DOMAIN = `reptiles.vercel.app`;

export const RATE_LIMIT_WINDOW = `1m`;

export const RATE_LIMIT_MAX = 10;

export const TTL = 60 * 30; // 30 minutes

export const MAX_DIMENSION = 250;

export const MAX_COLORS = 100;

export const MAX_SIZE = 250;

export const MAX_BORDER_WIDTH = 250;

export const REVALIDATE = 60 * 5; // 5 minutes

export const DEFAULT_QUERY = `{
  svg(options: {
    hue: "green"
    luminosity: dark
  }){
    url
    data
  }
}
`;
