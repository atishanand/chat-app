import React, { useState } from "react";
import firebase from "firebase/app";
import { Button, Message, Tag, toaster } from "rsuite";
import { auth } from "../../misc/firebase";

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    "google.com": auth.currentUser?.providerData?.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser?.providerData?.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can not disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);

      toaster.push(
        <Message type="info" closable duration={4000}>
          {`Disconnected from ${providerId}`}
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

  const unlinkFacebook = () => {
    unlink("facebook.com");
  };
  const unlinkGoogle = () => {
    unlink("google.com");
  };

  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      toaster.push(
        <Message type="info" closable duration={4000}>
          {`Disconnected from ${provider.providerId}`}
        </Message>
      );

      updateIsConnected(provider.providerId, true);
    } catch (error) {
      toaster.push(
        <Message type="error" closable duration={4000}>
          {error.message}
        </Message>
      );
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected["google.com"] && (
        <Tag color="green" closable onClose={unlinkGoogle}>
          <i className="bi bi-google"></i> Connected
        </Tag>
      )}

      {isConnected["facebook.com"] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <i className="bi bi-facebook"></i> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected["google.com"] && (
          <Button block color="green" appearance="primary" onClick={linkGoogle}>
            <i className="bi bi-google"></i> Link to Google
          </Button>
        )}

        {!isConnected["facebook.com"] && (
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={linkFacebook}
          >
            <i className="bi bi-facebook"></i> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
