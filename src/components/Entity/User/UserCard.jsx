import "./UserCard.scss";
import { Card } from "../../UI/Card.jsx";

const UserCard = ({ user }) => {
  // INITIALISATION
  // STATE
  // HANDLERS
  // VIEW
  return (
    <div className="userCard">
      <Card>
        <p>{user.UserEmail.substring(0, 8)}</p>
        <p>{`${user.UserFirstname} ${user.UserLastname}`}</p>
        <img src={user.UserImageURL} alt={user.UserEmail.substring(0, 8)} />
      </Card>
    </div>
  );
};

export default UserCard;
