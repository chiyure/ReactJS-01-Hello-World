import { useState, useEffect } from "react";
import Spacer from "../../UI/Spacer.jsx";
import Action from "../../UI/Actions.jsx";
import "./ModuleForm.scss";

const initialModule = {
  ModuleName: null,
  ModuleCode: null,
  ModuleLevel: null,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL: "",
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

  const apiURL = "https://softwarehub.uk/unibase/api";
  const yearsEndpoint = `${apiURL}/years`;
  const staffEndpoint = `${apiURL}/users/staff`;

  // STATE
  const [module, setModule] = useState(initialModule);
  const [years, setYears] = useState(null);
  const [staff, setStaff] = useState(null);

  const apiGET = async (endpoint, setState) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setState(result);
  };

  useEffect(() => {
    apiGET(yearsEndpoint, setYears);
  }, [yearsEndpoint]);

  useEffect(() => {
    apiGET(staffEndpoint, setStaff);
  }, [staffEndpoint]);

  // HANDLERS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = () => onSubmit(module);

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
              <p>Loading records ...</p>
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
              <p>Loading records ...</p>
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
          <Action.Submit showText onClick={handleSubmit} />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
};

export default ModuleForm;
