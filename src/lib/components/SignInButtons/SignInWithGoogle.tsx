import { Container, Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";

import { auth } from "../../../fbase/app";

export default function SignInWithGoogle({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);
  // TODO Automatic routing on successfull signIN

  useEffect(() => {
    // Check if user registration is successful
    if (user) {
      // Redirect to the login page
      router.push("/login");
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
          onClick={() => signInWithGoogle()}
        >
          {children}
        </Button>
      )}
    </Container>
  );
}
