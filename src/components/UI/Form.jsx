import { useState } from "react";
import { Confirm, useAlert } from "./Alert.jsx";
import Spacer from "./Spacer.jsx";
import Action from "./Actions.jsx";
import "./Form.scss";

const Form = ({ onSubmit, onCancel, children }) => {
  // Initialisation
  // State
  const [isConfirmOpen, confirmMessage, openConfirm, closeConfirm] = useAlert();
  // Handlers
  const handleConfirm = () => openConfirm("Are you sure you want to submit?");
  // View
  return (
    <div className="Form">
      {isConfirmOpen && (
        <Confirm message={confirmMessage} onDismiss={closeConfirm} onConfirm={onSubmit} />
      )}
      <Spacer>
        <div className="FormTray">
          <Spacer>{children}</Spacer>
        </div>
        <Action.Tray>
          <Action.Submit showText onClick={handleConfirm} />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
};

const useForm = (initialRecord, conformance, onSubmit) => {
  // Initialisation
  // State
  const [record, setRecord] = useState(initialRecord);
  // Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = () => onSubmit(record);

  // View
  return [record, handleChange, handleSubmit];
};

// Compound component
Form.useForm = useForm;

export default Form;
