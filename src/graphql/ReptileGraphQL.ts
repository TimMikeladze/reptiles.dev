import schema from './schema';
import { createModule } from 'graphql-modules';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateTiles, toDataUrl } from '@/util/generateTiles';
import { loader } from '@/util/loader';
import getAppUrl from '@/util/getAppUrl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ReptileGraphQL = createModule({
  id: `reptile-graphql`,
  typeDefs: [schema],
  dirname: __dirname,
  resolvers: {
    Query: {
      svg(root: any, args: any, context: any) {
        const canvas = generateTiles(args.options);
        return {
          url: getAppUrl(loader(args.options)()),
          data: toDataUrl(canvas),
        };
      },
    },
  },
});

export default ReptileGraphQL;
