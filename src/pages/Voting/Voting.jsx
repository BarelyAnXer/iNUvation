import React, { useEffect, useState } from "react";
import styles from "./Voting.module.css";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export default function Voting() {
  const [teamData, setTeamData] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamsArray = [];

      querySnapshot.forEach((doc) => {
        teamsArray.push({ id: doc.id, ...doc.data() });
      });

      setTeamData(teamsArray);
    };
    fetchData();
  }, []);

  const handleTeamSelection = (teamId) => {
    const selectedTeam = teamData.find((team) => team.id === teamId);

    console.log(selectedTeam);

    if (selectedTeams.length < 3 && !selectedTeams.includes(selectedTeam)) {
      const newSelectedTeams = [...selectedTeams, selectedTeam];
      setSelectedTeams(newSelectedTeams);
    } else if (selectedTeams.includes(selectedTeam)) {
      const updatedTeams = selectedTeams.filter((team) => team.id !== teamId);
      setSelectedTeams(updatedTeams);
    } else {
      console.log("You can only select 3 teams.");
    }
  };

  const handleSubmission = async () => {
    try {
      for (const selectedTeam of selectedTeams) {
        const teamRef = doc(db, "teams", selectedTeam.id);
        await updateDoc(teamRef, {
          votes: (selectedTeam.votes || 0) + 1,
        });
      }

      toast.success("Votes submitted successfully!");
      
    } catch (error) {
      console.error("Error submitting votes:", error.message);
      toast.error("Error submitting votes. Please try again.");
    }
  };

  return (
    <>
      <div>
        <p className={styles.choose}>Choose your Top 3</p>
        {teamData ? (
          <div className={styles.teamContainer}>
            {teamData.map((team, index) => (
              <div
                key={team.id}
                onClick={() => handleTeamSelection(team.id)}
                className={
                  selectedTeams.includes(team)
                    ? styles.selectedTeam
                    : styles.team
                }
              >
                <p>{team.id}</p>
                <p>{team.memberName1}</p>
                <p>{team.memberName2}</p>
                <p>{team.memberName3}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading team data...</p>
        )}
      </div>

      <button onClick={handleSubmission} className={styles.button}>
        submit
      </button>
    </>
  );
}
