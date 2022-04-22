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
import NextReptiles from '@/components/NextReptiles';
import Reptiles from '@/components/Reptiles';

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
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}></Grid>
        <Grid xs={8}>
          <Reptiles width={800} height={800} s={30} count={3} />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
