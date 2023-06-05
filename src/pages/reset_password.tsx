import { Container } from "@nextui-org/react";

import ResetPasswordForm from "../lib/components/Form/ResetPasswordForm";
import BackgroundImageContainer from "lib/layout/BackgroundImageContainer";

export default function ResetPassword() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <ResetPasswordForm />
      </Container>
    </BackgroundImageContainer>
  );
}
