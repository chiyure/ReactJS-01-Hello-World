import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext.jsx";
import Action from "../UI/Actions.jsx";
import "./Login.scss";

const staff = { UserID: 820, UserFirstname: "Zoe", UserUsertypeID: 1 };

const student = { UserID: 369, UserFirstname: "Nathan", UserUsertype: 2 };

const Login = () => {
  // Initialisation
  const { login } = useAuth();
  const navigate = useNavigate();

  // State
  // Handlers
  const handleLogin = (user) => {
    login(user);
    navigate("/");
  };

  // View
  return (
    <>
      <h1>Login</h1>
      <Action.Tray>
        <Action.Add showText buttonText="Log in as student" onClick={() => handleLogin(student)} />
        <Action.Add showText buttonText="Log in as staff" onClick={() => handleLogin(staff)} />
      </Action.Tray>
    </>
  );
};

export default Login;
