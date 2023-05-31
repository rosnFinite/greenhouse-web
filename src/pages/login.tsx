import { Container } from "@nextui-org/react";

import LoginForm from "../lib/components/Form/LoginForm";

export default function Login() {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <LoginForm />
    </Container>
  );
}
