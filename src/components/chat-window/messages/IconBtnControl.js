import React from "react";
import { Badge, IconButton, Tooltip, Whisper } from "rsuite";

const ConditionBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

const IconBtnControl = ({
  isVisible,
  iconName,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <ConditionBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayClose={0}
          delayOpen={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={iconName}
          />
        </Whisper>
      </ConditionBadge>
    </div>
  );
};

export default IconBtnControl;
