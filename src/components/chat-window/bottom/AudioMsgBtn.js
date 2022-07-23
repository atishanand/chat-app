import React, { useCallback, useState } from "react";
import { ReactMic } from "react-mic";
import { useParams } from "react-router";
import { InputGroup, Message, toaster } from "rsuite";
import { storage } from "../../../misc/firebase";

const AudioMsgBtn = ({ afterUpload }) => {
  const { chatId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onClick = useCallback(() => {
    setIsRecording((p) => !p);
  }, []);

  const onUpload = useCallback(
    async (data) => {
      setIsUploading(true);

      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };

        setIsUploading(false);

        afterUpload([file]);
      } catch (error) {
        setIsUploading(false);
        toaster.push(
          <Message type="error" closable duration={4000}>
            {error.message}
          </Message>
        );
      }
    },
    [afterUpload, chatId]
  );
  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading}
      className={isRecording ? "animate-blink" : ""}
    >
      <i className="bi bi-mic-fill"></i>
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mimeType="audio/mp3"
      />
    </InputGroup.Button>
  );
};

export default AudioMsgBtn;
