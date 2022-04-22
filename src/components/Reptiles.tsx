import React from 'react';
import { GenerateTilesOptions } from '@/util/generateTiles';
import { loader } from '@/util/loader';

export interface ReptilesProps
  extends Partial<
    GenerateTilesOptions &
      React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >
  > {
  host?: string;
}

const Reptiles = (props: Partial<ReptilesProps>) => {
  return <img src={loader(props)()} {...props} />;
};

export default Reptiles;
