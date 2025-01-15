import React, { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContextA } from "../context/ContextA";

export type MenuItem = {
  name: String;
  isOpen: Boolean;
  isClose: Boolean;
};

const MenuButton = () => {
  const { addTimer } = useContextA();
  const [timerName, setTimerName] = useState<string | undefined>(undefined);
  const [timerType, setTimerType] = useState<string | undefined>(undefined);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuItemModal, setMenuItemModal] = React.useState<MenuItem>({
    name: "create a timer1",
    isOpen: false,
    isClose: true,
  });

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (timerName && timerType) {
      addTimer({ timerName: timerName, timerType: timerType });
      setTimerName("");
      setTimerType("");
      setMenuItemModal((prev) => {
        return {
          ...prev,
          isOpen: !prev.isOpen,
          isClose: !prev.isClose,
        };
      });
    }
  };

  const handleModalClick = () => {
    setAnchorEl(null);
    setMenuItemModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isClose: !prev.isClose,
      };
    });
  };

  const handleModalClose = () => {
    setMenuItemModal((prev) => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        isClose: !prev.isClose,
      };
    });
    setTimerName("");
    setTimerType("");
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
      >
        <h4 className="w-6 h-6 bg-slate-400 rounded-lg"></h4>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <div className="flex gap-2">
            <h4 className="w-6 h-6 bg-slate-400 rounded-lg"></h4>
            <h4>Username</h4>
            <h4>MoreNames</h4>
          </div>
        </MenuItem>
        <MenuItem onClick={handleModalClick}>
          <div className="flex gap-2">
            <h4>create a timer</h4>
          </div>
        </MenuItem>
      </Menu>

      <Modal
        open={!!menuItemModal.isOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-slate-400 p-4 rounded-lg"
          >
            <input
              type="text"
              name="timerName"
              placeholder="Timer Name"
              value={timerName}
              onChange={(e) => setTimerName(e.target.value)}
              required
            />
            <input
              type="text"
              name="timerType"
              placeholder="Timer Type"
              value={timerType}
              onChange={(e) => setTimerType(e.target.value)}
              required
            />
            <button type="submit">create a timer</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuButton;
