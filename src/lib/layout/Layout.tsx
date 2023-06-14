import { styled } from "@nextui-org/react";

const Box = styled("div", {
  boxSizing: "border-box",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      {children}
    </Box>
  );
}
