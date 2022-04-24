import React, { useEffect } from 'react';
import {
  Card,
  Text,
  Grid,
  Divider,
  Button,
  Input,
  Checkbox,
  Tooltip,
  styled,
} from '@nextui-org/react';
import Reptiles from '@/components/Reptiles';
import { Icon } from '@iconify/react';
import KofiButton from 'kofi-button';

import getAppUrl from '@/util/getAppUrl';
import { LOC_URL, REPO_URL } from '@/util/constants';
import { customId } from '@/util/customId';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const KofiButtonContainer = styled(`div`, {
  my: `$8`,
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
} as any);

export const getStaticProps = async () => {
  return {
    revalidate: 60,
    props: {
      options: {
        luminosity: `random`,
        id: customId(),
        key: customId(),
        seed: customId(),
        count: 4,
        size: 40,
        borderWidth: 2,
        dimension: 20,
        borderColor: `#ffffff`,
      },
    },
  };
};

const Index = (props: any) => {
  const [luminosity, setLuminosity] = React.useState<any>([
    props.options.luminosity,
  ]);
  const [id, setId] = React.useState<string>(props.options.id);
  const [seed, setSeed] = React.useState<string>(props.options.seed);
  const [count, setCount] = React.useState<number>(props.options.count);
  const [size, setSize] = React.useState<number>(props.options.size);
  const [borderWidth, setBorderWidth] = React.useState<number>(
    props.options.borderWidth,
  );
  const [dimension, setDimension] = React.useState<number>(
    props.options.dimension,
  );
  const [borderColor, setBorderColor] = React.useState<string>(
    props.options.borderColor,
  );
  const [hue, setHue] = React.useState<string>();
  const [key, setKey] = React.useState<string>(props.options.key);

  const options = {
    key,
    id,
    seed,
    luminosity,
    hue,
    dimension,
    count,
    size,
    borderWidth: borderWidth,
    borderColor: borderColor,
  };

  const handleRandomize = () => {
    setKey(customId());
    setId(customId());
    setSeed(customId());
    setCount(getRandomInt(2, 10));
    setDimension(20);
    setLuminosity([`random`]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAppUrl(`/${key}`));
  };

  useEffect(() => {
    setKey(customId());
  }, [
    luminosity,
    id,
    seed,
    luminosity,
    hue,
    dimension,
    count,
    size,
    borderWidth,
    borderColor,
  ]);

  return (
    <>
      <Grid.Container gap={4} justify="space-between">
        <Grid xs={12} md={4}>
          <div>
            <Card css={{ height: `max-content` }}>
              <Card.Header
                css={{
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <Text h4 css={{ pl: `$8` }}>
                  reptiles.dev
                </Text>
                <Button auto light as="a" href={REPO_URL}>
                  <Icon
                    icon="ci:github"
                    style={{ color: `white`, fontSize: 22 }}
                  />
                </Button>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: `$10` }}>
                <Text h5 css={{ mx: `$6` }}>
                  Generate colorful and temporarily identifiable SVGs with
                  unique urls.
                </Text>
                <br />
                <Text h6 css={{ mx: `$6` }}>
                  Every image is given a key and cached for a short while.
                  Including the key of the image in a link will return the
                  cached image. If no image is cached than one will be generated
                  cached with the given key.
                  <br />
                  <br />
                  This method of generating random yet temporarily identifiable
                  image is great to use when mocking & developing front-ends,
                  mapping some fake ids to images, or as placeholder images
                  inside a Storybook.
                </Text>
                <Text
                  css={{
                    borderColor: `#333333`,
                    borderWidth: 1,
                    borderStyle: `dashed`,
                    borderRadius: 8,
                    mt: `$9`,
                    mx: `$6`,
                    p: `$6`,
                  }}
                  h6
                >
                  {`<img src="${getAppUrl(`/svg`)}" />`}
                  <br />
                  <br />
                  {`<img src="${getAppUrl(`/svg/?size=20&hue=green`)}" />`}
                  <br />
                  <br />
                  {`<img src="${getAppUrl(`/${key}`)}" />`}
                </Text>
                <Grid.Container gap={2} css={{ mt: `$4` }}>
                  <Grid xs={12}>
                    <Button
                      ghost
                      css={{ width: `100%` }}
                      onClick={handleRandomize}
                    >
                      Generate random pattern
                    </Button>
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      size="md"
                      fullWidth
                      css={{
                        width: `100%`,
                        paddingTop: 10,
                      }}
                      labelLeft={`reptiles.dev`}
                      contentRightStyling={false}
                      value={`/${key}`}
                      contentRight={
                        <Tooltip content="Copy URL" rounded color="primary">
                          <Button
                            auto
                            light
                            css={{ padding: 8, marginRight: 8 }}
                            onClick={handleCopy}
                          >
                            <Icon
                              style={{ fontSize: 18 }}
                              icon="ph:copy-bold"
                            />
                          </Button>
                        </Tooltip>
                      }
                    />
                  </Grid>

                  <Grid xs={12}>
                    <Checkbox.Group
                      row
                      size="xs"
                      label="Luminosity"
                      color="secondary"
                      defaultValue={[`none`]}
                      value={luminosity}
                      onChange={(x) =>
                        setLuminosity([x.length ? x.pop() : [`random`]])
                      }
                    >
                      <Checkbox value="random">Random</Checkbox>
                      <Checkbox value="light">Light</Checkbox>
                      <Checkbox value="bright">Bright</Checkbox>
                      <Checkbox value="dark">Dark</Checkbox>
                    </Checkbox.Group>
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Color count"
                      type="number"
                      value={count}
                      onChange={(e: any) => setCount(e.target.value)}
                      placeholder="4"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="ID"
                      value={id}
                      onChange={(e: any) => setId(e.target.value)}
                      placeholder={`xxxxxx`}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Color seed"
                      value={seed}
                      onChange={(e: any) => setSeed(e.target.value)}
                      placeholder={`xxxxxx`}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      labelLeft="Hue"
                      value={hue}
                      onChange={(e: any) => setHue(e.target.value)}
                      placeholder="#ffffff"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Dimension"
                      type="number"
                      value={dimension}
                      onChange={(e: any) => setDimension(e.target.value)}
                      placeholder="20"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Size"
                      type="number"
                      value={size}
                      onChange={(e: any) => setSize(e.target.value)}
                      placeholder="40"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Border width"
                      type="number"
                      value={borderWidth}
                      onChange={(e: any) => setBorderWidth(e.target.value)}
                      placeholder="2"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Border color"
                      value={borderColor}
                      onChange={(e: any) => setBorderColor(e.target.value)}
                      placeholder="#fffff"
                    />
                  </Grid>
                </Grid.Container>
              </Card.Body>
            </Card>
            <KofiButtonContainer>
              <KofiButton
                color="#0070F3"
                title="Buy Me a Coffee"
                kofiID="linesofcodedev"
              />
              <Button light href={LOC_URL} as="a">
                <Text h4>@linesofcodedev</Text>
              </Button>
            </KofiButtonContainer>
          </div>
        </Grid>
        <Grid
          xs={12}
          md={8}
          css={{
            height: `100vh`,
          }}
        >
          <Reptiles
            imgProps={{
              width: `100%`,
              height: `100%`,
            }}
            options={options}
          />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
