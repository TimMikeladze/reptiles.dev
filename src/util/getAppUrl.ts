import isDev from './isDev';
import { PREVIEW_DOMAIN, PRODUCTION_DOMAIN } from './constants';

const getAppUrl = (path = ``, noHttp?: boolean, noPort?: boolean) =>
  isDev()
    ? `${noHttp ? `` : `http://`}localhost${noPort ? `` : `:3000`}${path}`
    : `${
        noHttp
          ? ``
          : `http${
              [`production`, `preview`].includes(
                process.env.NEXT_PUBLIC_VERCEL_ENV as string,
              )
                ? `s`
                : ``
            }://`
      }${
        process.env.NEXT_PUBLIC_VERCEL_ENV === `production`
          ? PRODUCTION_DOMAIN
          : PREVIEW_DOMAIN
      }${path}`;

export default getAppUrl;
