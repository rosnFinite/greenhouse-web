import { Container } from "@nextui-org/react";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("../lib/components/Form/ResetPasswordForm")
);
const BackgroundImageContainer = dynamic(
  () => import("lib/layout/BackgroundImageContainer")
);

export default function ResetPassword() {
  return (
    <BackgroundImageContainer>
      <Container display="flex" css={{ height: "100vh" }}>
        <ResetPasswordForm />
      </Container>
    </BackgroundImageContainer>
  );
}
