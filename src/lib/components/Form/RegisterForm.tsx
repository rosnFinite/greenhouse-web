import {
  Container,
  Input,
  Spacer,
  Button,
  Image,
  Text,
  Link,
  Loading,
} from "@nextui-org/react";
import type { FormElement } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";

import { auth } from "../../../fbase/firebaseClient";
import SignInWithGoogle from "../SignInButtons/SignInWithGoogle";

import FormContainer from "./FormContainer";

export default function RegisterForm() {
  const router = useRouter();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const [createUserWithEmailAndPassword, , , fbError] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    // Check if user registration is successful
    if (user) {
      // Redirect to the login page
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleChange = (event: React.ChangeEvent<FormElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    // Reset the error before trying to submit the form
    if (error) setError("");

    // Check passwords match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwort stimmt nicht überein");
      return;
    }

    // Check password format
    const passwordRegex = /^.{8,256}$/gm;

    if (!passwordRegex.test(signUpForm.password)) {
      setError("Passwort muss mindestens 8 Stellen haben");
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password).then(
      (userCredentials) => {
        axios.post("/api/user", {
          uid: userCredentials?.user.uid,
          displayName: userCredentials?.user.displayName,
          email: userCredentials?.user.email,
        });
      }
    );
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
      <SignInWithGoogle>Mit Google registrieren</SignInWithGoogle>
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
        name="email"
        placeholder="E-Mail"
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
      <Spacer y={0.5} />
      <Input.Password
        aria-label="Passwort bestätigen"
        name="confirmPassword"
        width="100%"
        placeholder="Passwort bestätigen"
        status="default"
        onChange={handleChange}
      />
      {(error || fbError) && (
        <Text size="$xs" color="error">
          {error || fbError?.message}
        </Text>
      )}
      <Spacer y={1.5} />
      {loading ? (
        <Loading css={{ margin: "auto", width: "100%" }} color="success" />
      ) : (
        <Button
          aria-label="Registrieren"
          css={{ width: "100%" }}
          shadow
          color="success"
          onPress={handleSubmit}
        >
          Konto erstellen
        </Button>
      )}
      <Spacer y={1} />
      <Text size="$xs" css={{ marginTop: "0px" }}>
        Bereits registriert?{" "}
        <Link href="/login" color="success">
          Melde dich hier an
        </Link>
      </Text>
    </FormContainer>
  );
}
