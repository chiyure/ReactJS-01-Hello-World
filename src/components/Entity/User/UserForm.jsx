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
    },
    html2js: {
      UserFirstname: (value) => (value === " " ? null : value),
      UserLastname: (value) => (value === " " ? null : value),
      UserEmail: (value) => (value === " " ? null : value),
    },
  };

  const validation = {
    isValid: {
      UserFirstname: (name) => name && name.length > 1,
      UserLastname: (name) => name && name.length > 1,
      UserEmail: (email) =>
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          email,
        ),
    },
    errorMessage: {
      UserFirstname: "First name must at least two characters",
      UserLastname: "Last name must at least two characters",
      UserEmail: "Invalid email format",
    },
  };

  // State
  const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initialUser,
    conformance,
    validation,
    onSubmit,
  );
  // Handlers
  // View
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
    </Form>
  );
};

export default UserForm;
