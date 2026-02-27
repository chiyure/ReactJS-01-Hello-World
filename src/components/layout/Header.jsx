import { useContext } from "react";
import AuthContext from "../auth/authContext.js";
import "./header.scss";

const Header = () => {
  // Initialisation
  const loggedInUser = useContext(AuthContext);
  // State
  // Handlers
  // View
  return (
    <header>
      <h1>Introducing Context</h1>
      <p className="welcome">Welcome {loggedInUser.UserFirstname} </p>
    </header>
  );
};

export default Header;
