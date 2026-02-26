import { useState, useEffect } from "react";
import useLoad from "../../api/useLoad.js";
import apiURL from "../../api/apiURL.js";
import { Confirm, useAlert } from "../../UI/Alert.jsx";
import Spacer from "../../UI/Spacer.jsx";
import Action from "../../UI/Actions.jsx";
import "./ModuleForm.scss";

const initialModule = {
  ModuleName: null,
  ModuleCode: null,
  ModuleLevel: null,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL:
    "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

const ModuleForm = ({ onSubmit, onCancel }) => {
  // INITIALISATION

  const conformance = {
    js2html: {
      ModuleName: (value) => (value === null ? " " : value),
      ModuleCode: (value) => (value === null ? " " : value),
      ModuleLevel: (value) => (value === null ? "0" : value),
      ModuleYearID: (value) => (value === null ? "0" : value),
      ModuleLeaderID: (value) => (value === null ? "0" : value),
      ModuleImageURL: (value) => (value === null ? " " : value),
    },
    html2js: {
      ModuleName: (value) => (value === " " ? null : value),
      ModuleCode: (value) => (value === " " ? null : value),
      ModuleLevel: (value) => (value === "0" ? null : parseInt(value)),
      ModuleYearID: (value) => (value === "0" ? null : parseInt(value)),
      ModuleLeaderID: (value) => (value === "0" ? null : parseInt(value)),
      ModuleImageURL: (value) => (value === " " ? null : value),
    },
  };

  const yearsEndpoint = `${apiURL}/years`;
  const staffEndpoint = `${apiURL}/users/staff`;

  // STATE
  const [module, setModule] = useState(initialModule);

  const [years, loadingYearsMessage] = useLoad(yearsEndpoint);
  const [staff, loadingStaffMessage] = useLoad(staffEndpoint);
  const [isConfirmOpen, confirmMessage, openConfirm, closeConfirm] = useAlert();

  // HANDLERS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = () => onSubmit(module);

  // VIEW
  return (
    <div className="moduleForm">
      {isConfirmOpen && (
        <Confirm
          message={confirmMessage}
          onDismiss={closeConfirm}
          onConfirm={handleSubmit}
        />
      )}

      <Spacer>
        <div className="FormTray">
          <label>
            Module Name
            <input
              type="text"
              name="ModuleName"
              value={conformance.js2html.ModuleName(module.ModuleName)}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Code
            <input
              type="text"
              name="ModuleCode"
              value={conformance.js2html.ModuleCode(module.ModuleCode)}
              onChange={handleChange}
            />
          </label>

          <label>
            Module Level
            <select
              name="ModuleLevel"
              value={conformance.js2html.ModuleLevel(module.ModuleLevel)}
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
            {!years ? (
              <p>{loadingYearsMessage}</p>
            ) : (
              <select
                name="ModuleYearID"
                value={conformance.js2html.ModuleYearID(module.ModuleYearID)}
                onChange={handleChange}>
                <option value="0" hidden>
                  No year selected
                </option>
                {years.map((year) => (
                  <option key={year.YearID} value={year.YearID}>
                    {year.YearName}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Module Leader
            {!staff ? (
              <p>{loadingStaffMessage}</p>
            ) : (
              <select
                name="ModuleLeaderID"
                value={conformance.js2html.ModuleLeaderID(
                  module.ModuleLeaderID,
                )}
                onChange={handleChange}>
                <option value="0" hidden>
                  No user selected
                </option>
                {staff.map((user) => (
                  <option key={user.UserID} value={user.UserID}>
                    {`${user.UserFirstname} ${user.UserLastname}`}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Module Image
            <input
              type="text"
              name="ModuleImageURL"
              value={conformance.js2html.ModuleImageURL(module.ModuleImageURL)}
              onChange={handleChange}
            />
          </label>
        </div>

        <Action.Tray>
          <Action.Submit
            showText
            onClick={() => openConfirm("Are you sure you want to submit?")}
          />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
};

export default ModuleForm;
