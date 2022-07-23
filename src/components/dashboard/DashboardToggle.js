import React, { useCallback } from "react";
import { Button, Drawer, Message, toaster } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/profile.context";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();

        toaster.push(
          <Message type="info" closable duration={4000}>
            Signed out
          </Message>
        );

        close();
      })
      .catch((error) => {
        toaster.push(
          <Message type="error" closable duration={4000}>
            {error.message}
          </Message>
        );
      });
  }, [close]);
  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        <DashboardIcon /> Dashboard
      </Button>

      <Drawer
        size={isMobile ? "full" : "sm"}
        open={isOpen}
        onClose={close}
        placement="left"
      >
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
