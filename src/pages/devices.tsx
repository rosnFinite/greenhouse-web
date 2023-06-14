import { Container, Text } from "@nextui-org/react";

import NavbarContainer from "lib/layout/NavbarContainer";

export default function Devices() {
  return (
    <NavbarContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <Text>Devices</Text>
      </Container>
    </NavbarContainer>
  );
}
