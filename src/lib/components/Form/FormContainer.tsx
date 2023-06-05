import { Card } from "@nextui-org/react";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card
      variant="bordered"
      css={{
        bgColor: "White",
        width: "30%",
        minWidth: "350px",
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        position: "relative",
        "@smMax": {
          marginTop: "5vh",
          width: "100%",
        },
      }}
    >
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
