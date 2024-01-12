import React, { useEffect, useState } from "react";
import styles from "./Gathering.module.css";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Gathering() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
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
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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

      {/* <p className={styles.eventTitle}>Events</p> */}

      <div className={styles.container}>
        <p className={styles.title}>
          NUvations 2024: A Bulldog's Solution Innovation Pitch
        </p>
        <p className={styles.description}>
          Welcome to iNUvations 2024: A Bulldog's Solution Innovation Pitch, an
          electrifying event where ingenuity takes center stage!
        </p>
        <p className={styles.date}>January 12, 2024</p>

        <Link className={styles.voteButton} to={"/voting"}>
          Vote
        </Link>
      </div>
    </>
  );
}
