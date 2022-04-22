import { omit } from 'lodash';

export const loader = (props: any) => () => {
  const cleaned = omit(props, [
    `src`,
    `host`,
    `height`,
    `width`,
    `quality`,
  ]) as any;

  const searchParams = new URLSearchParams(cleaned);

  return `${props.host ? props.host : ``}/api/tiles${
    searchParams.toString() ? `?${searchParams.toString()}` : ``
  }`;
};
