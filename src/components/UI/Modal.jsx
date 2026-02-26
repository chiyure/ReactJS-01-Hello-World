import { useState } from "react";
import "./Modal.scss";

export const Modal = ({ title, headerColor, children }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW
  return (
    <div className="ModalOverlay">
      <div className="ModalPane">
        <header style={{ backgroundColor: headerColor }}>
          <p>{title}</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export const useModal = (initialState) => {
  // STATE
  const [isOpen, setIsOpen] = useState(initialState);

  // HANDLERS
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // RETURN
  return [isOpen, open, close];
};
