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
        const options = {
          ...args.options,
          colors: args.options.colors
            ? args.options.colors
                .map((x: string) => x.replace(/[^a-zA-Z0-9]/g, ``))
                .join(`-`)
            : undefined,
        };

        const [svg] = generateTiles(options);

        return {
          url: getAppUrl(loader(options)()),
          data: toDataUrl(svg),
        };
      },
    },
  },
});

export default ReptileGraphQL;
