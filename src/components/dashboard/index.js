import React from "react";
import { Button, Divider, Drawer, Message, toaster } from "rsuite";
import { useProfile } from "../../context/profile.context";
import { database } from "../../misc/firebase";
import AvatarUploadBtn from "./AvatarUploadBtn";
import EditableInput from "../EditableInput";
import ProviderBlock from "./ProviderBlock";
import { getUserUpdates } from "../../misc/helper";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );

      await database.ref().update(updates);

      toaster.push(
        <Message type="success" closable duration={4000}>
          Nickname has been updated
        </Message>
      );
    } catch (error) {
      toaster.push(
        <Message type="error" closable duration={4000}>
          {error.message}
        </Message>
      );
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>

        <Drawer.Actions>
          <Button color="red" appearance="primary" onClick={onSignOut}>
            Sign out
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>

        <ProviderBlock />

        <Divider />

        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />

        <AvatarUploadBtn />
      </Drawer.Body>
    </>
  );
};

export default Dashboard;
