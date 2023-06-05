import {
  Container,
  Input,
  Spacer,
  Button,
  Image,
  Text,
  Link,
} from "@nextui-org/react";
import type { FormElement } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../../fbase/app";
import SignInWithGoogle from "../SignInButtons/SignInWithGoogle";

import FormContainer from "./FormContainer";

export default function LoginForm() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, , fbError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    // Check if user registration is successful
    if (user) {
      // Redirect to the login page
      router.push("/");
    }
  }, [user, router]);

  const login = (): void => {
    signInWithEmailAndPassword(signInForm.email, signInForm.password);
  };

  const handleChange = (event: React.ChangeEvent<FormElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <FormContainer>
      <Container display="flex">
        <Image
          src="https://i.ibb.co/BgnybnJ/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Container>
      <SignInWithGoogle>Mit Google anmelden</SignInWithGoogle>
      <Spacer y={1} />
      <Text
        css={{
          width: "100%",
          textAlign: "center",
          "@smMax": { marginTop: "5vh", width: "100%" },
        }}
      >
        oder
      </Text>
      <Spacer y={1} />
      <Input
        aria-label="Email"
        placeholder="Email"
        name="email"
        width="100%"
        status="default"
        onChange={handleChange}
      />
      <Spacer y={0.5} />
      <Input.Password
        aria-label="Passwort"
        name="password"
        width="100%"
        placeholder="Passwort"
        status="default"
        onChange={handleChange}
      />
      <Spacer y={0.25} />
      <Text size="$xs" css={{ marginTop: "0px" }}>
        Passwort oder Email vergessen? klicke{" "}
        <Link href="/reset_password" color="success">
          hier
        </Link>
      </Text>
      <Spacer y={1} />
      {fbError && (
        <Text size="$xs" color="error" css={{ marginTop: "0px" }}>
          {fbError.message}
        </Text>
      )}
      <Button
        aria-label="Login"
        css={{ width: "100%" }}
        shadow
        color="success"
        onPress={login}
      >
        Anmelden
      </Button>
      <Spacer y={1} />
      <Text size="$xs" css={{ marginTop: "0px" }}>
        Noch kein Konto?{" "}
        <Link href="/register" color="success">
          Hier registrieren
        </Link>
      </Text>
    </FormContainer>
  );
}
