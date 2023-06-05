import { Container } from "@nextui-org/react";

export default function BackgroundImageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container fluid className="background" gap={0}>
      {children}
    </Container>
  );
}
