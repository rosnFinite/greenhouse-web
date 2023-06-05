import { Container } from "@nextui-org/react";

import LoginForm from "../lib/components/Form/LoginForm";
import BackgroundImageContainer from "lib/layout/BackgroundImageContainer";

export default function Login() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <LoginForm />
      </Container>
    </BackgroundImageContainer>
  );
}
