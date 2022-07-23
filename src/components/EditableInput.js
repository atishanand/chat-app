import React, { useCallback, useState } from "react";
import { Input, InputGroup, Message, toaster } from "rsuite";
import CloseIcon from "@rsuite/icons/Close";
import EditIcon from "@rsuite/icons/Edit";
import CheckIcon from "@rsuite/icons/Check";

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = "Write your value",
  emptyMsg = "Input is empty",
  wrapperClassName = "",
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);

  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      toaster.push(
        <Message type="info" closable duration={4000}>
          {emptyMsg}
        </Message>
      );
    }

    if (trimmed !== initialValue) {
      await onSave(input);
    }

    setIsEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />

        <InputGroup.Button onClick={onEditClick}>
          {isEditable ? <CloseIcon /> : <EditIcon />}
        </InputGroup.Button>

        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <CheckIcon />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
