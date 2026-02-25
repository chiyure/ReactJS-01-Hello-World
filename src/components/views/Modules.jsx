import { useEffect, useState } from "react";
import useLoad from "../api/useLoad.js";
import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
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
  const [showForm, setShowForm] = useState(false);
  const [modules, loadingMessage] = useLoad(modulesEndpoint);

  // HANDLERS
  const handleAdd = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (module) => {
    const result = await API.post(postModulesEndpoint, module);
    if (result.isSuccess) {
      setShowForm(false);
      loadModules(modulesEndpoint);
    } else alert(`Submission unsuccessful: ${result.message}`);
  };

  // VIEW
  return (
    //wrap in fragment
    <>
      <h1>Modules</h1>
      <Spacer>
        {!showForm ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new module"
              onClick={handleAdd}
            />
          </Action.Tray>
        ) : (
          <ModuleForm onSubmit={handleSubmit} onCancel={handleCancel} />
        )}

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
