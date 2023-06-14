import { Container, Text } from "@nextui-org/react";

import NavbarContainer from "lib/layout/NavbarContainer";

export default function Dashboard() {
  return (
    <NavbarContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <Text>Dashboard</Text>
      </Container>
    </NavbarContainer>
  );
}
