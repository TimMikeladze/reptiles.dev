import React from 'react';
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
} from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Image from 'next/image';

const myLoader = () => {
  return `/api/tiles`;
};

const Index = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  // const MockItem = ({ text }) => {
  //   return (
  //     <Card color="primary" css={{ h: `$20` }}>
  //       <Text h6 size={15} color="white" css={{ m: 0 }}>
  //         {text}
  //       </Text>
  //     </Card>
  //   );
  // };

  return (
    <>
      <Grid.Container gap={2} justify="flex-start"></Grid.Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={4}></Grid>
        <Grid>
          <Image loader={myLoader} src="img.svg" width={150} height={150} />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
