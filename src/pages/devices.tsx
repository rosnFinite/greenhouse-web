import { Container, Text } from "@nextui-org/react";
import type { ReactElement } from "react";

import NavbarContainer from "lib/layout/NavbarContainer";

import type { NextPageWithLayout } from "./_app";

const Devices: NextPageWithLayout = () => {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <Text>Devices</Text>
    </Container>
  );
};

Devices.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Devices;
