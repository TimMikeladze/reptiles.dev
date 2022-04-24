import React from 'react';
import { GenerateTilesOptions } from '@/util/generateTiles';
import getAppUrl from '@/util/getAppUrl';

export interface ReptilesProps {
  host?: string;
  imgProps: Partial<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  >;
  options?: GenerateTilesOptions;
}

const Reptiles = (props: Partial<ReptilesProps> = {}) => {
  return (
    <img src={getAppUrl(`/svg/${props?.options?.key}`)} {...props.imgProps} />
  );
};

export default Reptiles;
