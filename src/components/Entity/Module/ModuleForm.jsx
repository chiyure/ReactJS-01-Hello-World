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

  const validation = {
    isValid: {
      ModuleName: (name) => name && name.length > 8,
      ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
      ModuleLevel: (level) => level > 3 && level < 8,
      ModuleYearID: (id) => id === null || id > 0,
      ModuleLeaderID: (id) => id === null || id > 0,
      ModuleImageURL: (url) =>
        /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(
          url,
        ),
    },

    errorMessage: {
      ModuleName: "Module name is too short",
      ModuleCode: "Module code is not in a valid format",
      ModuleLevel: "Invalid module level",
      ModuleYearID: "Invalid delivery year has been selected",
      ModuleLeaderID: "Invalid module leader has been selected",
      ModuleImageURL: "The URL entered is not a valid URL string",
    },
  };

  const yearsEndpoint = `${apiURL}/years`;
  const staffEndpoint = `${apiURL}/users/staff`;

  // State
  const [module, errors, handleChange, handleSubmit] = Form.useForm(
    initialModule,
    conformance,
    validation,
    onSubmit,
  );
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
        error={errors.ModuleName}
      />

      <Form.TextInput
        label="Module Code"
        name="ModuleCode"
        value={conformance.js2html.ModuleCode(module.ModuleCode)}
        onChange={handleChange}
        error={errors.ModuleCode}
      />

      <Form.TextSelect
        label="Module Level"
        name="ModuleLevel"
        value={conformance.js2html.ModuleLevel(module.ModuleLevel)}
        options={levelOptions}
        onChange={handleChange}
        error={errors.ModuleLevel}
      />

      <Form.TextSelect
        label="Module Year"
        name="ModuleYearID"
        value={conformance.js2html.ModuleYearID(module.ModuleYearID)}
        options={yearOptions}
        onChange={handleChange}
        error={errors.ModuleYearID}
      />

      <Form.TextSelect
        label="Module Leader"
        name="ModuleLeaderID"
        value={conformance.js2html.ModuleLeaderID(module.ModuleLeaderID)}
        options={leaderOptions}
        onChange={handleChange}
        error={errors.ModuleLeaderID}
      />

      <Form.TextInput
        label="Module Image"
        name="ModuleImageURL"
        value={conformance.js2html.ModuleImageURL(module.ModuleImageURL)}
        onChange={handleChange}
        error={errors.ModuleImageURL}
      />
    </Form>
  );
};

export default ModuleForm;
