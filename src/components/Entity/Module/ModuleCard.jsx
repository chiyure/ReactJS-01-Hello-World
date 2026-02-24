import "./ModuleCard.scss";
import { Card } from "../../UI/Card.jsx";

const ModuleCard = ({ module }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW
  return (
    <div className="moduleCard">
      <Card>
        <p>{module.ModuleCode}</p>
        <p>{module.ModuleName}</p>
        <img src={module.ModuleImageURL} alt={module.ModuleName} />
      </Card>
    </div> //callback function; // card container lives in main and in main has cards
  );
};

export default ModuleCard;
