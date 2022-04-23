import { omit } from 'lodash';

export const loader =
  (props: any = {}) =>
  () => {
    const cleaned = omit(props, [
      `src`,
      `host`,
      `height`,
      `width`,
      `quality`,
    ]) as any;

    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] === ``) {
        delete cleaned[key];
      }
      if (cleaned[key] === undefined || cleaned[key] === null) {
        delete cleaned[key];
      }
    });

    const searchParams = new URLSearchParams(cleaned);

    return `${props.host ? props.host : ``}/svg${
      searchParams.toString() ? `?${searchParams.toString()}` : ``
    }`;
  };
