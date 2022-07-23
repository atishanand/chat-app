import React, { useCallback, useRef, useState } from "react";
import firebase from "firebase/app";
import { Button, Form, Message, Modal, Schema, toaster } from "rsuite";
import CreativeIcon from "@rsuite/icons/Creative";
import { useModalState } from "../misc/custom-hooks";
import { auth, database } from "../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is required"),
  description: StringType().isRequired("Description is required"),
});

const INITIAl_FORM = {
  name: "",
  description: "",
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAl_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref("rooms").push(newRoomData);

      toaster.push(
        <Message type="info" closable duration={4000}>
          {`${formValue.name} has been created`}
        </Message>
      );

      setIsLoading(false);

      setFormValue(INITIAl_FORM);

      close();
    } catch (error) {
      setIsLoading(false);

      toaster.push(
        <Message type="error" closable duration={4000}>
          {error.message}
        </Message>
      );
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" appearance="primary" onClick={open}>
        <CreativeIcon /> Create new chat room
      </Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <Form.Group>
              <Form.ControlLabel>Room name</Form.ControlLabel>
              <Form.Control name="name" placeholder="Enter chat room name..." />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                name="description"
                placeholder="Enter room description..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
