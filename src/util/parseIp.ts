const parseIp = (req: any) =>
  req.headers[`x-forwarded-for`]?.split(`,`).shift() ||
  req.socket?.remoteAddress;

export default parseIp;
