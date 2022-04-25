import React, { useState } from 'react';
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
import gtag from 'ga-gtag';

import getAppUrl from '@/util/getAppUrl';
import {
  LOC_URL,
  MAX_BORDER_WIDTH,
  MAX_COLORS,
  MAX_DIMENSION,
  MAX_SIZE,
  REPO_URL,
  REVALIDATE,
} from '@/util/constants';
import { customId } from '@/util/customId';
import { isFunction, isString } from 'lodash';

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
    revalidate: REVALIDATE,
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
  const [copied, setCopied] = React.useState<boolean>(false);

  const [options, setOptions] = useState({
    luminosity: [`random`],
    ...props.options,
  });

  const handleChangeOptions = (name: string, value: any) => {
    setOptions({
      ...options,
      key: customId(),
      [name]: value,
    });
  };

  const handleRandomize = () => {
    gtag(`event`, `randomized`);

    setOptions({
      ...options,
      id: customId(),
      key: customId(),
      seed: customId(),
      count: getRandomInt(2, 10),
      dimension: 20,
    });

    setCopied(false);
  };

  const handleCopy = () => {
    gtag(`event`, `copied`);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);

    navigator.clipboard.writeText(getAppUrl(`/${options.key}`));
  };

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
                <Button
                  auto
                  light
                  as="a"
                  href={REPO_URL}
                  onClick={() => gtag(`event`, `github`)}
                >
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
                  Including the identifier of the image in a link will return
                  the cached image. The generated SVGs are cached for up to one
                  hour before they are removed. After that point a new image
                  will be generated when the url is visited.
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
                  {`<img src="${getAppUrl(`/${options.key}`)}" />`}
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
                      value={`/${options.key}`}
                      contentRight={
                        <Tooltip
                          content={copied ? `Copied to clipboard.` : `Copy URL`}
                          rounded
                          color="primary"
                        >
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
                    <KofiButtonContainer>
                      <div
                        onClick={() => {
                          gtag(`event`, `kofi`);
                        }}
                      >
                        <KofiButton
                          color="#0070F3"
                          title="Buy Me a Coffee"
                          kofiID="linesofcodedev"
                        />
                      </div>
                      <Button
                        light
                        href={LOC_URL}
                        as="a"
                        onClick={() => {
                          gtag(`event`, `footer`);
                        }}
                      >
                        <Text h4>@linesofcodedev</Text>
                      </Button>
                    </KofiButtonContainer>
                  </Grid>

                  <Grid xs={12}>
                    <Checkbox.Group
                      row
                      size="xs"
                      label="Luminosity"
                      color="secondary"
                      value={options.luminosity || []}
                      onChange={(x) => {
                        if (isString(x)) {
                          handleChangeOptions(`luminosity`, [
                            x.replace(`random`, ``),
                          ]);
                        } else if (x && x.length && isFunction(x.pop)) {
                          handleChangeOptions(`luminosity`, [x.pop()]);
                        } else {
                          handleChangeOptions(`luminosity`, [`random`]);
                        }
                      }}
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
                      max={MAX_COLORS}
                      labelLeft="Color count"
                      type="number"
                      value={options.count}
                      onChange={(e: any) =>
                        handleChangeOptions(`count`, e.target.value)
                      }
                      placeholder="4"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      labelLeft="ID"
                      value={options.id}
                      onChange={(e: any) =>
                        handleChangeOptions(`id`, e.target.value)
                      }
                      placeholder={`xxxxxx`}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <Input
                      fullWidth
                      labelLeft="Color seed"
                      value={options.seed}
                      onChange={(e: any) =>
                        handleChangeOptions(`seed`, e.target.value)
                      }
                      placeholder={`xxxxxx`}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      labelLeft="Hue"
                      value={options.hue}
                      onChange={(e: any) =>
                        handleChangeOptions(`hue`, e.target.value)
                      }
                      placeholder="#ffffff"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      max={MAX_DIMENSION}
                      labelLeft="Dimension"
                      type="number"
                      value={options.dimension}
                      onChange={(e: any) =>
                        handleChangeOptions(`dimension`, e.target.value)
                      }
                      placeholder="20"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      max={MAX_SIZE}
                      labelLeft="Size"
                      type="number"
                      value={options.size}
                      onChange={(e: any) =>
                        handleChangeOptions(`size`, e.target.value)
                      }
                      placeholder="40"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      max={MAX_BORDER_WIDTH}
                      labelLeft="Border width"
                      type="number"
                      value={options.borderWidth}
                      onChange={(e: any) =>
                        handleChangeOptions(`borderWidth`, e.target.value)
                      }
                      placeholder="2"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      fullWidth
                      min={1}
                      labelLeft="Border color"
                      value={options.borderColor}
                      onChange={(e: any) =>
                        handleChangeOptions(`borderColor`, e.target.value)
                      }
                      placeholder="#fffff"
                    />
                  </Grid>
                </Grid.Container>
              </Card.Body>
            </Card>
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
