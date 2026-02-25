import { useState } from "react";
import Spacer from "../../UI/Spacer.jsx";
import Action from "../../UI/Actions.jsx";
import "./ModuleForm.scss";

const initialModule = {
  ModuleName: "",
  ModuleCode: "",
  ModuleLevel: 0,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL: "",
};

const ModuleForm = ({ onCancel }) => {
  // INITIALISATION
  // STATE
  const [module, setModule] = useState(initialModule);

  // HANDLERS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: value });
  };

  const handleSubmit = () => alert(JSON.stringify(module));

  // VIEW

  return (
    <div className="moduleForm">
      <Spacer>
        <div className="FormTray">
          <label>
            Module Name
            <input
              type="text"
              name="ModuleName"
              value={module.ModuleName}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Code
            <input
              type="text"
              name="ModuleCode"
              value={module.ModuleCode}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Level
            <select
              name="ModuleLevel"
              value={module.ModuleLevel}
              onChange={handleChange}>
              <option value="0" hidden>
                No level selected
              </option>
              {[3, 4, 5, 6, 7].map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </label>

          <label>
            Module Year
            <input
              type="text"
              name="ModuleYear"
              value={module.ModuleYearID}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Leader
            <input
              type="text"
              name="ModuleLeader"
              value={module.ModuleLeaderID}
            />
          </label>

          <label>
            Module Image
            <input
              type="text"
              name="ModuleImageURL"
              value={module.ModuleImageURL}
              onChange={handleChange}
            />
          </label>
        </div>

        <Action.Tray>
          <Action.Submit showText onClick={handleSubmit} />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
};

export default ModuleForm;
