import React from 'react';
import { createImageUrl } from '@/util/createImageUrl';
import { GenerateTilesOptions } from '@/util/generator';

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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={createImageUrl({ host: props.host, ...props.options })}
      {...props.imgProps}
      alt="reptiles"
    />
  );
};

export default Reptiles;
