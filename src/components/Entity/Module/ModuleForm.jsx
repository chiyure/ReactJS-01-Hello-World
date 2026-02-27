import useLoad from "../../api/useLoad.js";
import apiURL from "../../api/apiURL.js";
import Form from "../../UI/Form.jsx";
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
  // Initialisation

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

  // State
  const [module, handleChange, handleSubmit] = Form.useForm(initialModule, conformance, onSubmit);
  const [years, loadingYearsMessage] = useLoad(yearsEndpoint);
  const [staff, loadingStaffMessage] = useLoad(staffEndpoint);

  // Handlers

  // View
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
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
            value={conformance.js2html.ModuleLeaderID(module.ModuleLeaderID)}
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
    </Form>
  );
};

export default ModuleForm;
