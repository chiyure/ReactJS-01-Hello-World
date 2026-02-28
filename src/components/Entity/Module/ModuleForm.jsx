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

  const levelOptions = {
    unselected: { value: "0", label: "No level selected" },
    list: [3, 4, 5, 6, 7].map((level) => ({
      value: level,
      label: `Level ${level}`,
    })),
  };

  const yearOptions = {
    noOptionsMessage: loadingYearsMessage,
    unselected: { value: "0", label: "No year selected" },
    list: years && years.map((year) => ({ value: year.YearID, label: year.YearName })),
  };

  const leaderOptions = {
    noOptionsMessage: loadingStaffMessage,
    unselected: { value: "0", label: "No leader selected" },
    list:
      staff &&
      staff.map((user) => ({
        value: user.UserID,
        label: `${user.UserFirstname} ${user.UserLastname}`,
      })),
  };

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.TextInput
        label="Module Name"
        name="ModuleName"
        value={conformance.js2html.ModuleName(module.ModuleName)}
        onChange={handleChange}
      />

      <Form.TextInput
        label="Module Code"
        name="ModuleCode"
        value={conformance.js2html.ModuleCode(module.ModuleCode)}
        onChange={handleChange}
      />

      <Form.TextSelect
        label="Module Level"
        name="ModuleLevel"
        value={conformance.js2html.ModuleLevel(module.ModuleLevel)}
        options={levelOptions}
        onChange={handleChange}
      />

      <Form.TextSelect
        label="Module Year"
        name="ModuleYearID"
        value={conformance.js2html.ModuleYearID(module.ModuleYearID)}
        options={yearOptions}
        onChange={handleChange}
      />

      <Form.TextSelect
        label="Module Leader"
        name="ModuleLeaderID"
        value={conformance.js2html.ModuleLeaderID(module.ModuleLeaderID)}
        options={leaderOptions}
        onChange={handleChange}
      />

      <Form.TextInput
        label="Module Image"
        name="ModuleImageURL"
        value={conformance.js2html.ModuleImageURL(module.ModuleImageURL)}
        onChange={handleChange}
      />
    </Form>
  );
};

export default ModuleForm;
