import isBrowser from '@/util/isBrowser';

const gaEnabled =
  isBrowser() &&
  process.env.NEXT_PUBLIC_GA_ID &&
  process.env.NEXT_PUBLIC_GA_ID.length > 0;

export default gaEnabled;
