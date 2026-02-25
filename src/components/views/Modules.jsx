import { useEffect, useState } from "react";
import Spacer from "../UI/Spacer.jsx";
import Action from "../UI/Actions.jsx";
import ModuleForm from "../Entity/Module/ModuleForm.jsx";
import { CardContainer } from "../UI/Card.jsx";
import ModuleCard from "../Entity/Module/ModuleCard.jsx";

const Modules = () => {
  // INITIALISATION
  const apiURL = "https://softwarehub.uk/unibase/api";
  const modulesEndpoint = `${apiURL}/modules`;

  // STATE
  const [modules, setModules] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setModules(result);
  };

  useEffect(() => {
    apiGet(modulesEndpoint);
  }, [modulesEndpoint]);

  // HANDLERS
  const handleAdd = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
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
          <ModuleForm onCancel={handleCancel} />
        )}

        {!modules ? (
          <p>Loading records ...</p>
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
