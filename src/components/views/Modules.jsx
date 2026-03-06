import { useAuth } from "../auth/authContext.jsx";
import useLoad from "../api/useLoad.js";
import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Alert, Error, useAlert } from "../UI/Alert.jsx";
import Spacer from "../UI/Spacer.jsx";
import Action from "../UI/Actions.jsx";
import ModuleForm from "../Entity/Module/ModuleForm.jsx";
import { CardContainer } from "../UI/Card.jsx";
import ModuleCard from "../Entity/Module/ModuleCard.jsx";

const Modules = () => {
  // Initialisation
  const { loggedInUser } = useAuth();
  const modulesEndpoint =
    loggedInUser.UserUsertypeID === 1
      ? `${apiURL}/modules/leader/${loggedInUser.UserID}`
      : `${apiURL}/modules/users/${loggedInUser.UserID}`;
  const postModulesEndpoint = `${apiURL}/modules`;

  // State
  const [modules, loadingMessage, loadModules] = useLoad(modulesEndpoint);
  const [isFormOpen, openForm, closeForm] = useModal(false);
  const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
  const [isErrorOpen, errorMessage, openError, closeError] = useAlert();

  // Handlers
  const handleSubmit = async (module) => {
    const result = await API.post(postModulesEndpoint, module);
    if (result.isSuccess) {
      closeForm();
      await loadModules(modulesEndpoint);
      openAlert("Submission successful");
    } else openError(`Submission unsuccessful: ${result.message}`);
  };

  // View
  return (
    //wrap in fragment
    <>
      <h1>Modules</h1>

      {isFormOpen && (
        <Modal title="Add new module">
          <ModuleForm onSubmit={handleSubmit} onCancel={closeForm} />
        </Modal>
      )}

      {isAlertOpen && <Alert message={alertMessage} onDismiss={closeAlert} />}
      {isErrorOpen && <Error message={errorMessage} onDismiss={closeError} />}

      <Spacer>
        <Action.Tray>
          <Action.Add showText buttonText="Add new module" onClick={openForm} />
        </Action.Tray>

        {!modules ? (
          <p>{loadingMessage}</p>
        ) : (
          <CardContainer>
            {modules.map((module) => (
              <ModuleCard key={module.ModuleID} module={module} />
            ))}
          </CardContainer>
        )}
      </Spacer>
    </>
  );
};

export default Modules;
