import { gql } from 'graphql-modules';

export default gql`
  type Query {
    svg(options: Options): Svg!
  }

  type Svg {
    data: String!
    url: String!
  }

  enum FormatType {
    hsvArray
    hslArray
    hsl
    hsla
    rgbArray
    rgb
    rgba
    hex
  }

  input Options {
    dimension: Float
    width: Float
    heigh: Float
    size: Int
    count: Int
    hue: String
    luminosity: String
    seed: ID
    format: FormatType
    alpha: Float
    borderWidth: Float
    borderColor: String
    id: ID
  }
`;
