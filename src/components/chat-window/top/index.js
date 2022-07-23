import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hooks";
import { ButtonToolbar } from "rsuite";
import RoomInfoBtnModal from "./RoomInfoBtnModal";
import EditRoomBtnDrawer from "./EditRoomBtnDrawer";

const Top = () => {
  const name = useCurrentRoom((v) => v.name);

  const isAdmin = useCurrentRoom((v) => v.isAdmin);

  const isMobile = useMediaQuery("(max-width: 992px)");

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Link
            to="/"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          >
            <i
              className="bi bi-arrow-left-circle-fill"
              style={{ fontSize: "1.8rem" }}
            ></i>
          </Link>

          <span className="text-disappear">{name}</span>
        </h4>

        <ButtonToolbar className="ws-nowrap">
          {isAdmin && <EditRoomBtnDrawer />}
        </ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
