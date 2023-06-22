import { Container, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";

const NavbarContainer = dynamic(() => import("lib/layout/NavbarContainer"));

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
