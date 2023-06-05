import { Container } from "@nextui-org/react";

import RegisterForm from "../lib/components/Form/RegisterForm";
import BackgroundImageContainer from "lib/layout/BackgroundImageContainer";

export default function Register() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <RegisterForm />
      </Container>
    </BackgroundImageContainer>
  );
}
