import type { FormElement } from "@nextui-org/react";
import { Button, Container, Input, Modal, Row, Text } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLock, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import { auth } from "../../../fbase/firebaseClient";

export default function AddDevicesModal() {
  const [visible, setVisible] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  // -1 no input; 0 incorrect deviceId; 1 correct deviceId
  const [linkSuccessful, setLinkSuccessful] = useState(-1);
  const [user] = useAuthState(auth);
  const handler = () => setVisible(true);

  const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
    setDeviceId(event.target.value);
  };

  const addDeviceHandler = () => {
    axios.post(
      "/api/device/add",
      { uid: user?.uid, deviceId },
      {
        validateStatus(status) {
          if (status === 200) {
            setLinkSuccessful(1);
            setTimeout(() => {
              setVisible(false);
            }, 3000);
            return true;
          }
          setLinkSuccessful(0);
          return true;
        },
      }
    );
  };

  const closeHandler = () => {
    setVisible(false);
    setLinkSuccessful(-1);
  };

  return (
    <Container>
      <Button
        auto
        bordered
        onPress={handler}
        color="success"
        icon={<AiOutlinePlus />}
        css={{ width: "30%", marginLeft: "auto", marginRight: "auto" }}
      />
      <Modal
        closeButton
        aria-labelledby="model-device-add"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          {linkSuccessful === 1 ? (
            <Text />
          ) : (
            <Text>Neues Gewächshaus hinzufügen</Text>
          )}
        </Modal.Header>
        <Modal.Body>
          {linkSuccessful <= 0 ? (
            <Input
              clearable
              bordered
              fullWidth
              name="deviceId"
              color="success"
              placeholder="Zugangscode"
              onChange={handleInputChange}
              contentLeft={<AiFillLock />}
            />
          ) : (
            <Container
              fluid
              alignItems="center"
              css={{ justifyContent: "center" }}
            >
              <Row justify="center">
                <AiOutlineCheck color="#17c964" size={32} />
              </Row>
              <Row justify="center">
                <Text color="success">
                  Gerät erfolgreich mit Konto verknüpft!
                </Text>
              </Row>
            </Container>
          )}
          {linkSuccessful === 0 ? (
            <Text small color="error">
              Gerät konnte nicht verknüpft werden!
            </Text>
          ) : (
            <Text />
          )}
        </Modal.Body>
        {linkSuccessful <= 0 ? (
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Abbrechen
            </Button>
            <Button auto flat color="success" onPress={addDeviceHandler}>
              Hinzufügen
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer />
        )}
      </Modal>
    </Container>
  );
}
