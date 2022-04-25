import schema from './schema';
import { createModule } from 'graphql-modules';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createImageUrl } from '@/util/createImageUrl';
import getAppUrl from '@/util/getAppUrl';
import { generator, toDataUrl } from '@/util/generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ReptileGraphQL = createModule({
  id: `reptile-graphql`,
  typeDefs: [schema],
  dirname: __dirname,
  resolvers: {
    Query: {
      async svg(root: any, args: any) {
        const options = {
          ...args.options,
          colors: args.options.colors
            ? args.options.colors
                .map((x: string) => x.replace(/[^a-zA-Z0-9]/g, ``))
                .join(`-`)
            : undefined,
        };

        const [svg] = await generator(options);

        return {
          url: getAppUrl(createImageUrl(options)),
          data: toDataUrl(svg),
        };
      },
    },
  },
});

export default ReptileGraphQL;
