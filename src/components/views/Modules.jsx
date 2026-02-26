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
  // INITIALISATION
  const modulesEndpoint = `${apiURL}/modules`;
  const postModulesEndpoint = `${apiURL}/modules`;

  // STATE
  const [modules, loadingMessage] = useLoad(modulesEndpoint);
  const [isFormOpen, openForm, closeForm] = useModal(false);
  const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
  const [isErrorOpen, errorMessage, openError, closeError] = useAlert();

  // HANDLERS
  const handleSubmit = async (module) => {
    const result = await API.post(postModulesEndpoint, module);
    if (result.isSuccess) {
      closeForm();
      loadModules(modulesEndpoint);
      openAlert("Submission successful");
    } else openError(`Submission unsuccessful: ${result.message}`);
  };

  // VIEW
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
