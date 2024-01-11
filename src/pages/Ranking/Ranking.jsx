import React, { useEffect, useState } from "react";
import styles from "./Ranking.module.css";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { rtdb, db, auth } from "../../firebase";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Ranking() {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamsArray = [];

      querySnapshot.forEach((doc) => {
        teamsArray.push({ id: doc.id, ...doc.data() });
      });

      teamsArray.sort((a, b) => b.votes - a.votes);

      setTeamData(teamsArray);
    };

    fetchData();
    console.log(teamData);
  }, []);

  const [user, setUser] = useState("");

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

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.welcome}>
          I<span className={styles.welcomeDifferent}>NU</span>VATION
        </p>

        {user ? (
          <p className={styles.greeting}>
            Welcome,{" "}
            <span className={styles.greetingDifferent}>{user.firstName}!</span>
          </p>
        ) : (
          <p className={styles.rankingTeamName}>Loading...</p>
        )}
      </div>

      <div className={styles.ranking}>
        <div className={styles.rankingTwo}>
          {teamData ? (
            <p className={styles.rankingTeamName}>{teamData[1].teamName}</p>
          ) : (
            <p className={styles.rankingTeamName}>Loading...</p>
          )}
          <div className={styles.circle2}>2</div>
        </div>
        <div className={styles.rankingOne}>
          {teamData ? (
            <p className={styles.rankingTeamName}>{teamData[0].teamName}</p>
          ) : (
            <p className={styles.rankingTeamName}>Loading...</p>
          )}
          <div className={styles.circle1}>1</div>
        </div>
        <div className={styles.rankingThree}>
          {teamData ? (
            <p className={styles.rankingTeamName}>{teamData[2].teamName}</p>
          ) : (
            <p className={styles.rankingTeamName}>Loading...</p>
          )}
          <div className={styles.circle3}>3</div>
        </div>
      </div>

      <h2 className={styles.top}>Top 3</h2>

      <div className={styles.teamData}>
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
                  <td>{teamData[teamName].votes}</td>
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
