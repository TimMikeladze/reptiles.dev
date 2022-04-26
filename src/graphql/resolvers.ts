import { createImageUrl } from '@/util/createImageUrl';
import getAppUrl from '@/util/getAppUrl';
import { generator, toDataUrl } from '@/util/generator';
import { QueryResolvers } from '@/generated/graphql';

const Query: QueryResolvers = {
  async svg(root, args) {
    const options = args.options
      ? {
          ...args.options,
          colors: args.options.colors
            ? args.options.colors
                .map((x: string) => x.replace(/[^a-zA-Z0-9]/g, ``))
                .join(`-`)
            : undefined,
        }
      : {};

    const { svg } = await generator(options);

    return {
      url: getAppUrl(createImageUrl(options)),
      data: toDataUrl(svg),
    };
  },
};

const resolvers = {
  Query,
};

export default resolvers;
