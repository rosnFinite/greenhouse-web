import { Button, Container, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";
import { AiFillLock, AiOutlinePlus } from "react-icons/ai";

export default function AddDevicesModal() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
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
          <Text>Neues Gewächshaus hinzufügen</Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="success"
            placeholder="Zugangscode"
            contentLeft={<AiFillLock />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Abbrechen
          </Button>
          <Button auto flat color="success" onPress={closeHandler}>
            Hinzufügen
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
