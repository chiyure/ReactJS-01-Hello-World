import { useEffect, useState } from "react";
import { CardContainer } from "../UI/Card.jsx";
import ModuleCard from "../Entity/Module/ModuleCard.jsx";

const Modules = () => {
  // INITIALISATION
  const apiURL = "https://softwarehub.uk/unibase/api";
  const modulesEndpoint = `${apiURL}/modules`;

  // STATE
  const [modules, setModules] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setModules(result);
  };

  useEffect(() => {
    apiGet(modulesEndpoint);
  }, [modulesEndpoint]);

  // HANDLERS
  // VIEW
  return (
    //wrap in fragment
    <>
      <h1>Modules</h1>
      {!modules ? (
        <p>Loading records ...</p>
      ) : (
        <CardContainer>
          {modules.map((module) => (
            <ModuleCard key={module.ModuleID} module={module} />
          ))}
        </CardContainer>
      )}
    </>
  );
};

export default Modules;
