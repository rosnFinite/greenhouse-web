import { Container } from "@nextui-org/react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../lib/components/Form/LoginForm"));
const BackgroundImageContainer = dynamic(
  () => import("lib/layout/BackgroundImageContainer")
);

export default function Login() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <LoginForm />
      </Container>
    </BackgroundImageContainer>
  );
}
