import schema from './schema';
import { createModule } from 'graphql-modules';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import resolvers from '@/graphql/resolvers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ReptileGraphQL = createModule({
  id: `reptile-graphql`,
  typeDefs: [schema],
  dirname: __dirname,
  resolvers,
});

export default ReptileGraphQL;
