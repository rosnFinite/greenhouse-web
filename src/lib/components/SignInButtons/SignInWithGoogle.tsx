import { Container, Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";

import { auth } from "../../../fbase/app";

export default function SignInWithGoogle({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle, , ,] = useSignInWithGoogle(auth);

  useEffect(() => {
    // Check if user registration is successful
    if (user) {
      // Redirect to the login page
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <Container
      gap={0}
      css={{
        "@smMax": {
          width: "100%",
          marginBottom: "-5vh",
        },
      }}
    >
      {loading ? (
        <Button size="md" shadow css={{ width: "100%" }} color="success">
          <Loading color="white" type="points-opacity" />
        </Button>
      ) : (
        <Button
          aria-label="Google Login"
          size="md"
          shadow
          icon={<FaGoogle />}
          css={{ width: "100%" }}
          color="success"
          onPress={() => signInWithGoogle()}
        >
          {children}
        </Button>
      )}
    </Container>
  );
}
