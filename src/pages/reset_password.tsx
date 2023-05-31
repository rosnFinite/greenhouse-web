import { Container } from "@nextui-org/react";

import ResetPasswordForm from "../lib/components/Form/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <Container display="flex" css={{ height: "100vh" }}>
      <ResetPasswordForm />
    </Container>
  );
}
