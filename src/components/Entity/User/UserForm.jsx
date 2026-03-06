import useLoad from "../../api/useLoad.js";
import apiURL from "../../api/apiURL.js";
import Form from "../../UI/Form.jsx";

const initialUser = {
  UserFirstname: null,
  UserLastname: null,
  UserEmail: null,
  UserRegistered: null,
  UserLevel: null,
  UserYearID: null,
  UserUsertypeID: null,
  UserImageURL:
    "https://images.generated.photos/MFF1Wosr9X-K2qT-Hqb23_61BCG87zVHo69hgSkq-7A/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzUzMjY2LmpwZw.jpg",
};

const UserForm = ({ onSubmit, onCancel }) => {
  // Initialisation
  const conformance = {
    js2html: {
      UserFirstname: (value) => (value === null ? " " : value),
      UserLastname: (value) => (value === null ? " " : value),
      UserEmail: (value) => (value === null ? " " : value),
      UserRegistered: (value) => (value === null ? "0" : value ? "1" : "-1"),
      UserLevel: (value) => (value === null ? "0" : value),
      UserYearID: (value) => (value === null ? "0" : value),
      UserUsertypeID: (value) => (value === null ? "0" : value),
      UserImageURL: (value) => (value === null ? " " : value),
    },
    html2js: {
      UserFirstname: (value) => (value === " " ? null : value),
      UserLastname: (value) => (value === " " ? null : value),
      UserEmail: (value) => (value === " " ? null : value),
      UserRegistered: (value) => (value === "0" ? null : value === "1"),
      UserLevel: (value) => (value === "0" ? null : parseInt(value)),
      UserYearID: (value) => (value === "0" ? null : parseInt(value)),
      UserUsertypeID: (value) => (value === "0" ? null : parseInt(value)),
      UserImageURL: (value) => (value === " " ? null : value),
    },
  };

  const validation = {
    isValid: {
      UserFirstname: (name) => name && name.length > 1,
      UserLastname: (name) => name && name.length > 1,
      UserEmail: (email) =>
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          email,
        ),
      UserRegistered: (status) => status !== null,
      UserLevel: (level) => level > 2 && level < 8,
      UserYearID: (id) => id > 0,
      UserUsertypeID: (id) => id > 0,
      UserImageURL: (url) =>
        /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(
          url,
        ),
    },
    errorMessage: {
      UserFirstname: "First name must at least two characters",
      UserLastname: "Last name must at least two characters",
      UserEmail: "Invalid email format",
      UserRegistered: "Registration status not selected",
      UserLevel: "Invalid level",
      UserYearID: "Academic year has not been selected",
      UserUsertypeID: "User type not selected",
      UserImageURL: "The URL entered is not a valid URL string",
    },
  };

  const yearsEndpoint = `${apiURL}/years`;
  const usertypesEndpoint = `${apiURL}/usertypes`;

  // State
  const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initialUser,
    conformance,
    validation,
    onSubmit,
  );

  const [years, loadingYearsMessage] = useLoad(yearsEndpoint);
  const [usertypes, loadingUsertypesMessage] = useLoad(usertypesEndpoint);
  // Handlers
  // View
  const registeredOptions = {
    unselected: { value: "0", label: "Registration no selected" },
    list: [
      { value: "1", label: "Registered" },
      { value: "-1", label: "Not registered" },
    ],
  };

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

  const usertypeOptions = {
    noOptionsMessage: loadingUsertypesMessage,
    unselected: { value: "0", label: "No year selected" },
    list:
      usertypes && usertypes.map((type) => ({ value: type.UsertypeID, label: type.UsertypeName })),
  };

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.TextInput
        label="First Name"
        name="UserFirstname"
        value={conformance.js2html.UserFirstname(user.UserFirstname)}
        onChange={handleChange}
        error={errors.UserFirstname}
      />

      <Form.TextInput
        label="Last Name"
        name="UserLastname"
        value={conformance.js2html.UserLastname(user.UserLastname)}
        onChange={handleChange}
        error={errors.UserLastname}
      />

      <Form.TextInput
        label="Email Address"
        name="UserEmail"
        value={conformance.js2html.UserEmail(user.UserEmail)}
        onChange={handleChange}
        error={errors.UserEmail}
      />

      <Form.TextSelect
        label="Registration Status"
        name="UserRegistered"
        value={conformance.js2html.UserRegistered(user.UserRegistered)}
        options={registeredOptions}
        onChange={handleChange}
        error={errors.UserRegistered}
      />

      <Form.TextSelect
        label="User Status"
        name="UserLevel"
        value={conformance.js2html.UserLevel(user.UserLevel)}
        options={levelOptions}
        onChange={handleChange}
        error={errors.UserLevel}
      />

      <Form.TextSelect
        label="Academic Year"
        name="UserYearID"
        value={conformance.js2html.UserYearID(user.UserYearID)}
        options={yearOptions}
        onChange={handleChange}
        error={errors.UserYearID}
      />

      <Form.TextSelect
        label="User type"
        name="UserUsertypeID"
        value={conformance.js2html.UserUsertypeID(user.UserUsertypeID)}
        options={usertypeOptions}
        onChange={handleChange}
        error={errors.UserUsertypeID}
      />

      <Form.TextInput
        label="URL of user image"
        name="UserImageURL"
        value={conformance.js2html.UserImageURL(user.UserImageURL)}
        onChange={handleChange}
        error={errors.UserImageURL}
      />
    </Form>
  );
};

export default UserForm;
