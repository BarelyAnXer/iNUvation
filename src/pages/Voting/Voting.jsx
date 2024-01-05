import React, { useEffect, useState } from "react";
import styles from "./Voting.module.css";
import { rtdb } from "../../firebase";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";

export default function Voting() {
  const [teamData, setTeamData] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    const teamsRef = ref(rtdb, "teams");
    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      setTeamData(data);
    });
  }, []);

  const handleTeamSelection = (teamName) => {
    if (selectedTeams.length < 3 && !selectedTeams.includes(teamName)) {
      const newSelectedTeams = [...selectedTeams, teamName];
      setSelectedTeams(newSelectedTeams);
    } else if (selectedTeams.includes(teamName)) {
      const updatedTeams = selectedTeams.filter(
        (selectedTeam) => selectedTeam !== teamName
      );
      setSelectedTeams(updatedTeams);
    } else {
      // You can add a message or notification here indicating the limit of 3 selections.
      // For simplicity, I'm logging a message to the console.
      console.log("You can only select 3 teams.");
    }
  };

  const handleSubmission = () => {
    selectedTeams.forEach((teamName) => {
      const teamRef = ref(rtdb, `teams/${teamName}`);
      get(teamRef).then((snapshot) => {
        const teamDetails = snapshot.val();
        if (teamDetails) {
          const updatedScore = teamDetails.score + 10;
          set(teamRef, { ...teamDetails, score: updatedScore });
        }
      });
    });
  };

  return (
    <>
      <div>
        <h2>Team Data</h2>
        {teamData ? (
          <div>
            {Object.keys(teamData).map((teamName, index) => (
              <div
                key={index}
                onClick={() => handleTeamSelection(teamName)}
                className={
                  selectedTeams.includes(teamName)
                    ? styles.selectedTeam
                    : styles.team
                }
              >
                {teamName}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading team data...</p>
        )}
      </div>

      <button onClick={handleSubmission}>submit</button>

      <div>
        <h3>Selected Teams:</h3>
        <ul>
          {selectedTeams.map((team, index) => (
            <li key={index}>{team}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
