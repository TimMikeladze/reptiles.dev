import apolloServer from '../../graphql/server';
import isDowntime from '../../util/isDowntime';

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  if (isDowntime()) {
    res.status(503).send(`Downtime`);
    return;
  }
  await startServer;
  await apolloServer.createHandler({
    path: `/api/graphql`,
  })(req, res);
}
