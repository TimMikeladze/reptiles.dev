import React from 'react';
import Image, { ImageProps } from 'next/image';
import { GenerateSvgProps } from '@/util/generateTiles';
import { omit } from 'lodash';

export interface ReptilesProps extends ImageProps, GenerateSvgProps {}

const Reptiles = (props: Partial<ReptilesProps>) => {
  const myLoader = () => {
    const cleaned = omit(props, [`src`, `height`, `width`, `quality`]) as any;

    const searchParams = new URLSearchParams(cleaned);

    return (
      `/api/tiles` +
      (searchParams.toString() ? `?${searchParams.toString()}` : ``)
    );
  };

  return (
    <Image {...props} loader={props.loader || myLoader} src="reptiles.svg" />
  );
};

export default Reptiles;
