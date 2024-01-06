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

        teamArray.sort((a, b) => b.score - a.score); // Sort the array by score in descending order
        setTeamData(teamArray); // Update the state with the sorted data
      } else {
        setTeamData(null); // Handle case where data is empty
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.ranking}>
        <div className={styles.rankingTwo}>
          <p className={styles.rankingTeamName}>Luisa</p>
          <div className={styles.circle}>2</div>
        </div>
        <div className={styles.rankingOne}>
        <p className={styles.rankingTeamName}>Maxine</p>
          <div className={styles.circle}>1</div>
        </div>
        <div className={styles.rankingThree}>
        <p className={styles.rankingTeamName}>Jewel</p>
          <div className={styles.circle}>3</div>
        </div>
      </div>

      <button
        onClick={() => {
          console.log(user);
          writeUserData("Team 2", "qwe", "asd", "zxc");
        }}
      >
        Click to Update Data
      </button>

      <div className={styles.teamData}>
        <h2>Team Data</h2>
        {teamData ? (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(teamData).map((teamName, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teamData[teamName].teamName}</td>
                  <td>{teamData[teamName].score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading team data...</p>
        )}
      </div>
    </div>
  );
}
