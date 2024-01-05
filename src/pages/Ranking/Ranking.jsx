import React, { useEffect, useState } from "react";
import styles from "./Ranking.module.css";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { rtdb } from "../../firebase";

export default function Ranking() {
  const [teamData, setTeamData] = useState(null);

  const writeUserData = async (teamName, member1, member2, member3) => {
    set(ref(rtdb, "teams/" + teamName), {
      member1: member1,
      member2: member2,
      member3: member3,
      score: 0,
    });
  };

  useEffect(() => {
    const teamsRef = ref(rtdb, "teams");
    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array for sorting
        const teamArray = Object.entries(data).map(([teamName, teamData]) => ({
          teamName,
          ...teamData,
        }));

        // Sort the array by score in descending order
        teamArray.sort((a, b) => b.score - a.score);

        // Update the state with the sorted data
        setTeamData(teamArray);
      } else {
        setTeamData(null); // Handle case where data is empty
      }
    });
  }, []);

  return (
    <div>
      <button onClick={() => writeUserData("Team 2", "qwe", "asd", "zxc")}>
        Click to Update Data
      </button>
      <div className={styles.teamData}>
        <h2>Team Data</h2>
        {teamData ? (
          <ul>
            {Object.keys(teamData).map((teamName, index) => (
              <li key={index}>
                <strong>{teamName}</strong>: {teamData[teamName].member1},{" "}
                {teamData[teamName].member2}, {teamData[teamName].member3},  {teamData[teamName].score}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading team data...</p>
        )}
      </div>
    </div>
  );
}
