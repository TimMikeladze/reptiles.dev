import React from 'react';
import { GenerateTilesOptions } from '@/util/generateTiles';
import { loader } from '@/util/loader';

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
    <img
      src={loader({ host: props.host, ...props.options })()}
      {...props.imgProps}
    />
  );
};

export default Reptiles;
