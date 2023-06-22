import { Container, Text } from "@nextui-org/react";
import type { ReactElement } from "react";

import NavbarContainer from "lib/layout/NavbarContainer";

import type { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <Text>settings</Text>
    </Container>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Settings;
