import { useState } from "react";
import { Modal, useModal } from "./Modal";
import Spacer from "./Spacer.jsx";
import Action from "./Actions.jsx";
import "./Alert.scss";

export const Alert = ({ message, onDismiss }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW
  return (
    <Modal title="Alert" headerColor="DodgerBlue">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

// CONFIRM
export const Confirm = ({ message, onConfirm, onDismiss }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  const handleConfirm = () => {
    onConfirm();
    onDismiss();
  };

  // VIEW
  return (
    <Modal title="Confirmation needed" headerColor="Orange">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Yes showText onClick={handleConfirm} />
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

// ERROR
export const Error = ({ message, onDismiss }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW
  return (
    <Modal title="Error" headerColor="Red">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

export const useAlert = () => {
  // STATE
  const [isOpen, openModal, close] = useModal(false);
  const [message, setMessage] = useState(null);

  // HANDLERS
  const open = (message) => {
    setMessage(message);
    openModal();
  };

  // RETURN
  return [isOpen, message, open, close];
};
