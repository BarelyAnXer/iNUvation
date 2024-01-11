import React, { useEffect, useState } from "react";
import styles from "./Voting.module.css";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

import { onAuthStateChanged } from "firebase/auth";

export default function Voting() {
  const [teamData, setTeamData] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [user, setUser] = useState("");

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Current user:", user.uid);
        const userDocRef = doc(db, "users", user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            console.log("User data from Firestore:", userData);
            setUser(userData);
          } else {
            console.log("User document does not exist in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
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
    if (selectedTeams.length != 3) {
      console.log("select 3");
      return;
    }

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
        <div className={styles.header}>
          <p className={styles.welcome}>
            I<span className={styles.welcomeDifferent}>NU</span>VATION
          </p>

          {user ? (
            <p className={styles.greeting}>
              Welcome,{" "}
              <span className={styles.greetingDifferent}>{user.firstName}</span>
            </p>
          ) : (
            <p className={styles.rankingTeamName}>Loading...</p>
          )}
        </div>

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
                <p className={styles.teamName}>{team.teamName}</p>
                <p className={styles.teamMember}>&#x2022; {team.memberName1}</p>
                <p className={styles.teamMember}>&#x2022; {team.memberName2}</p>
                <p className={styles.teamMember}>&#x2022; {team.memberName3}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading team data...</p>
        )}
      </div>

      <button onClick={handleSubmission} className={styles.button}>
        Submit
      </button>
    </>
  );
}
