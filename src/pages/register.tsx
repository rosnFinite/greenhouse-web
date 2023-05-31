import { Container } from "@nextui-org/react";

import RegisterForm from "../lib/components/Form/RegisterForm";

export default function Register() {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <RegisterForm />
    </Container>
  );
}
