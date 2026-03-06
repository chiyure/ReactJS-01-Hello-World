import { useAuth } from "../auth/authContext.jsx";
import useLoad from "../api/useLoad.js";
import apiURL from "../api/apiURL.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import Spacer from "../UI/Spacer.jsx";
import Action from "../UI/Actions.jsx";
import { CardContainer } from "../UI/Card.jsx";
import UserCard from "../Entity/User/UserCard.jsx";

const Students = () => {
  // Initialisation
  const { loggedInUser } = useAuth();
  const loggedInUserGroup = 13;
  const studentsEndpoint =
    loggedInUser.UserUsertypeID === 1
      ? `${apiURL}/users/student`
      : `${apiURL}/users/groups/${loggedInUserGroup}`;

  // State
  const [students, loadingMessage, loadModules] = useLoad(studentsEndpoint);
  const [isFormOpen, openForm, closeForm] = useModal(false);

  // Handlers

  // View

  return (
    <>
      <h1>Students</h1>

      {isFormOpen && (
        <Modal title="Add new user">
          <p>User form</p>
        </Modal>
      )}
      <Spacer>
        {loggedInUser.UserUsertypeID === 1 && (
          <Action.Tray>
            <Action.Add showText buttonText="Add new user" onClick={openForm} />
          </Action.Tray>
        )}

        {!students ? (
          <p>{loadingMessage}</p>
        ) : (
          <>
            <CardContainer>
              {students.map((student) => (
                <UserCard key={student.UserID} user={student} /> //callback function; card container lives in main and in main has cards
              ))}
            </CardContainer>
          </>
        )}
      </Spacer>
    </>
  );
};

export default Students;
