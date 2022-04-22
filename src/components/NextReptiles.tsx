import React from 'react';
import Image, { ImageProps } from 'next/image';
import { GenerateTilesOptions } from '@/util/generateTiles';
import { loader } from '@/util/loader';

export interface NextReptilesProps extends ImageProps, GenerateTilesOptions {
  host?: string;
}

const NextReptiles = (props: Partial<NextReptilesProps>) => {
  return (
    <Image
      {...props}
      loader={props.loader || loader(props)}
      src="reptiles.svg"
    />
  );
};

export default NextReptiles;
