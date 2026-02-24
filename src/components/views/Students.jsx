import { useEffect, useState } from "react";
import { CardContainer } from "../UI/Card.jsx";
import UserCard from "../Entity/User/UserCard.jsx";
import { createWebSocketModuleRunnerTransport } from "vite/module-runner";

const Students = () => {
  // INITIALISATION

  const newStudent = {
    UserFirstname: "Nathan",
    UserLastname: "Olsson",
    UserEmail: "K9999999@kingston.ac.uk",
    UserRegistered: 0,
    UserLevel: 4,
    UserYearID: 1,
    UserUsertypeID: 2,
    UserImageURL:
      "https://images.generated.photos/evdpMs0ZUOoMA0ACfCy98zzmy347YQxRmrPCWHp3v0g/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzUzMTEyLmpwZw.jpg",
    UserUsertypeName: "Student",
    UserYearName: "2022-23",
  };

  const loggedInUserGroup = 13;
  const apiURL = "https://softwarehub.uk/unibase/api";
  const myGroupEndpoint = `${apiURL}/users/groups/${loggedInUserGroup}`;

  // STATE

  const [students, setStudents] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setStudents(result);
  };

  useEffect(() => {
    apiGet(myGroupEndpoint);
  }, [myGroupEndpoint]);

  //apiGet(myGroupEndpoint); continuous loop

  // HANDLERS

  const handleAdd = (student) => {
    student.UserID = Math.floor(10000 * Math.random());
    setStudents([...students, newStudent]);
    console.log(`Length of students: ${students.length}`);
  };

  // VIEW

  return (
    //wrap in fragment

    <>
      <h1>Students</h1>
      {!students ? (
        <p>Loading records ...</p>
      ) : (
        <>
          <CardContainer>
            {students.map((student) => (
              <UserCard key={student.UserID} user={student} /> //callback function; // card container lives in main and in main has cards
            ))}
          </CardContainer>
          <button onClick={() => handleAdd(newStudent)}>Add student</button>
        </>
      )}
    </>
  );
};

export default Students;
