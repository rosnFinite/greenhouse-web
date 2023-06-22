import { Container } from "@nextui-org/react";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(
  () => import("../lib/components/Form/RegisterForm")
);
const BackgroundImageContainer = dynamic(
  () => import("lib/layout/BackgroundImageContainer")
);

export default function Register() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <RegisterForm />
      </Container>
    </BackgroundImageContainer>
  );
}
