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
  const postModulesEndpoint = `${apiURL}/modules`;

  // STATE
  const [modules, setModules] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGET = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setModules(result);
  };

  useEffect(() => {
    apiGET(modulesEndpoint);
  }, [modulesEndpoint]);

  const apiPOST = async (endpoint, record) => {
    // Build a request object
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-Type": "application/json" },
    };

    // Call the fetch
    const response = await fetch(endpoint, request);
    const result = await response.json();

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  // HANDLERS
  const handleAdd = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (module) => {
    const result = await apiPOST(postModulesEndpoint, module);
    if (result.isSuccess) {
      setShowForm(false);
      apiGET(modulesEndpoint);
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
