import Action from "../../UI/Actions.jsx";
import "./ModuleForm.scss";

const ModuleForm = ({ onCancel }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW

  return (
    <div className="moduleForm">
      <p>This is the form!</p>
      <Action.Tray>
        <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
      </Action.Tray>
    </div>
  );
};

export default ModuleForm;
