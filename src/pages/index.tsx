import React, { useMemo } from 'react';
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  Switch,
  useTheme,
  Grid,
  Divider,
  Button,
  Input,
  Checkbox,
  Tooltip,
  styled,
} from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import NextReptiles from '@/components/NextReptiles';
import Reptiles from '@/components/Reptiles';
import { Icon } from '@iconify/react';
import { loader } from '@/util/loader';
import KofiButton from 'kofi-button';

import { customId } from '@/util/customId';
import { nanoid } from 'nanoid';
import getAppUrl from '@/util/getAppUrl';
import { sample } from 'lodash';
import randomColor from 'randomcolor';
import { LOC_URL, REPO_URL } from '@/util/constants';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const KofiButtonContainer = styled(`div`, {
  my: `$8`,
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
});

const Index = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [luminosity, setLuminosity] = React.useState<any>([`random`]);
  const [id, setId] = React.useState<string>(nanoid(5));
  const [seed, setSeed] = React.useState<string>(nanoid(5));
  const [count, setCount] = React.useState<number>(4);
  const [size, setSize] = React.useState<number>(40);
  const [borderWidth, setBorderWidth] = React.useState<number>(4);
  const [dimension, setDimension] = React.useState<number>(20);
  const [borderColor, setBorderColor] = React.useState<string>(`#d5d5d5`);
  const [hue, setHue] = React.useState<string>();

  const options = {
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
    setId(nanoid(5));
    setSeed(nanoid(5));
    setCount(getRandomInt(1, 10));
    setSize(getRandomInt(10, 40));
    setBorderWidth(getRandomInt(1, 10));
    setDimension(getRandomInt(10, 30));
    setLuminosity([`random`]);
    setBorderColor(randomColor());
    setHue(randomColor());
  };

  const url = loader(options)();

  return (
    <>
      <Grid.Container gap={2} justify="flex-start"></Grid.Container>
      <Grid.Container gap={4} justify="space-between">
        <Grid xs={4}>
          <div>
            <Card css={{ height: `max-content` }}>
              <Card.Header
                css={{
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <Text h4>Reptiles.dev</Text>
                <Button auto light as="a" href={REPO_URL}>
                  <Icon
                    icon="ci:github"
                    style={{ color: `white`, fontSize: 22 }}
                  />
                </Button>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: `$10` }}>
                <Text h6>Generate colorful SVG placeholder images.</Text>
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
                      disabled
                      size="md"
                      fullWidth
                      css={{
                        width: `100%`,
                        paddingTop: 10,
                      }}
                      bordered
                      contentRightStyling={false}
                      value={getAppUrl(url, true, false)}
                      contentRight={
                        <Tooltip content="Copy URL" rounded color="primary">
                          <Button
                            auto
                            light
                            css={{ padding: 8, marginRight: 8 }}
                            onClick={() => {
                              navigator.clipboard.writeText(getAppUrl(url));
                            }}
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
          xs={8}
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
