import { Container, Text } from "@nextui-org/react";

import NavbarContainer from "lib/layout/NavbarContainer";

export default function Settings() {
  return (
    <NavbarContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <Text>settings</Text>
      </Container>
    </NavbarContainer>
  );
}
