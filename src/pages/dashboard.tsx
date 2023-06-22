import { Container, Text } from "@nextui-org/react";
import type { ReactElement } from "react";

import NavbarContainer from "lib/layout/NavbarContainer";

import type { NextPageWithLayout } from "./_app";

const Dashboard: NextPageWithLayout = () => {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <Text>Dashboard</Text>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Dashboard;
