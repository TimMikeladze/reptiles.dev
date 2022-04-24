import { ApolloError, ApolloServer } from 'apollo-server-micro';
import { createApplication } from 'graphql-modules';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {
  DEFAULT_QUERY,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW,
} from '@/util/constants';
import { applyMiddleware } from 'graphql-middleware';
import { shield } from 'graphql-shield';
import isDev from '@/util/isDev';
import { createRateLimitRule } from 'graphql-rate-limit';
import parseIp from '@/util/parseIp';
import ReptileGraphQL from './ReptileGraphQL';
import getAppUrl from '@/util/getAppUrl';

const rateLimitUserAgentAndIp = createRateLimitRule({
  identifyContext: (context) => {
    return `${context.userAgent}-${context.ip}`;
  },
});

const queryRateLimit = rateLimitUserAgentAndIp({
  window: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
});

const application = createApplication({
  modules: [ReptileGraphQL],
});

const permissions = shield(
  {},
  {
    fallbackRule: queryRateLimit,
    allowExternalErrors: isDev(),
    debug: isDev(),
  },
);

const schema = applyMiddleware(
  application.createSchemaForApollo(),
  permissions,
);

const plugins = [
  ApolloServerPluginLandingPageGraphQLPlayground({
    tabs: [
      {
        endpoint: getAppUrl(`/api/graphql`),
        query: DEFAULT_QUERY,
      },
    ],
  }),
];

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  formatError: (error: any) => {
    return new ApolloError(error.message, error.extensions.code);
  },
  plugins: plugins as any,

  context: ({ req }) => ({
    userAgent: req.headers[`user-agent`],
    ip: parseIp(req),
  }),
});

export default apolloServer;
