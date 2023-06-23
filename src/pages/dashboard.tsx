import { Container, Text, Grid, Card } from "@nextui-org/react";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";

const NavbarContainer = dynamic(() => import("lib/layout/NavbarContainer"));

const MockItem = ({ text }: { text: string }): JSX.Element => {
  return (
    <Card css={{ $$cardColor: "$colors$success" }}>
      <Card.Body>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          {text}
        </Text>
        <Text size={15}>sadaksd</Text>
      </Card.Body>
    </Card>
  );
};

const Dashboard: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      alignContent="flex-start"
      css={{ height: "100vh" }}
    >
      <Grid.Container
        gap={2}
        justify="center"
        css={{
          padding: 0,
          height: "200px",
          marginBottom: "$10",
          marginTop: "$10",
        }}
      >
        <Grid xs={12} md={4}>
          <MockItem text="Temperatur" />
        </Grid>
        <Grid xs={12} md={4}>
          <MockItem text="Luftfeuchtigkeit" />
        </Grid>
        <Grid xs={12} md={4}>
          <MockItem text="Pflanzengröße" />
        </Grid>
      </Grid.Container>
      <Grid.Container
        gap={2}
        justify="center"
        css={{ padding: 0, height: "200px" }}
      >
        <Grid xs={12} md={4}>
          <MockItem text="Bodenfeuchtigkeit 1" />
        </Grid>
        <Grid xs={12} md={4}>
          <MockItem text="Bodenfeuchtigkeit 2" />
        </Grid>
        <Grid xs={12} md={4}>
          <MockItem text="Bodenfeuchtigkeit 3" />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Dashboard;
