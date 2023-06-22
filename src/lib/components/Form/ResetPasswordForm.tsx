import { Text, Input, Button, Spacer } from "@nextui-org/react";
import type { FormElement } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { auth } from "../../../fbase/FirebaseProvider";

import FormContainer from "./FormContainer";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const [sendPasswordResetEmail, , fbError] = useSendPasswordResetEmail(auth);

  const handleSubmit = async () => {
    await sendPasswordResetEmail(email);
    setIsSuccess(true);
  };

  return (
    <FormContainer>
      <Text h2>Passwort zurücksetzen</Text>
      <Spacer y={1} />
      {isSuccess ? (
        <>
          <Text h3 color="success">
            Es wurde eine E-Mail zur Passwortänderung an die angegebene Adresse
            verschickt
          </Text>
          <Spacer y={2} />
          <Button ghost color="success" onPress={() => router.push("/login")}>
            Zurück zum Login
          </Button>
        </>
      ) : (
        <>
          <Text>
            {`Geben Sie die mit Ihrem Konto verknüpfte E-Mail ein, und wir werden 
            senden Ihnen einen Link zum Zurücksetzen.`}
          </Text>
          <Spacer y={1} />
          <Input
            aria-label="Email"
            placeholder="Email"
            name="email"
            width="100%"
            status="default"
            onChange={(e: React.ChangeEvent<FormElement>) =>
              setEmail(e.target.value)
            }
          />
          <Spacer y={1} />
          {fbError && (
            <Text size="$xs" color="error">
              {fbError.message}
            </Text>
          )}

          <Button
            aria-label="Passwort zurücksetzen"
            css={{ width: "100%" }}
            shadow
            color="success"
            onPress={handleSubmit}
          >
            Passwort zurücksetzen
          </Button>
        </>
      )}
    </FormContainer>
  );
}
