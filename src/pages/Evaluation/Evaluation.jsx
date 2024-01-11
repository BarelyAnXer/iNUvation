import React from "react";
import styles from "./Evaluation.module.css";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { rtdb, db, auth } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Evaluation() {
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
    <>
      <div className={styles.header}>
        <p className={styles.welcome}>
          I<span className={styles.welcomeDifferent}>NU</span>VATION
        </p>

        <p className={styles.greeting}>
          Welcome, <span className={styles.greetingDifferent}>{user.firstName}!</span>
        </p>
      </div>

      <div className={styles.container}>
        <p className={styles.description}>
          Thank you {user.firstName}! <br />
          we appreciate your time and effort <br />
          Hope to win your chosen team.
        </p>
      </div>

      <Link className={styles.voteButton} to="/register">
        View Result
      </Link>
    </>
  );
}
