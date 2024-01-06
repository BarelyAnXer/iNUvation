import React from "react";
import styles from "./Gathering.module.css";
export default function Gathering() {
  const getCurrentLoggedInUser = () => {};

  return (
    <>
      <div className={styles.header}>
        <p className={styles.welcome}>
          I<span className={styles.welcomeDifferent}>NU</span>VATION
        </p>

        <p className={styles.greeting}>
          Welcome, <span className={styles.greetingDifferent}>Zye !</span>
        </p>
      </div>

      <p className={styles.eventTitle}>Events</p>

      <div className={styles.container}>
        <p className={styles.title}>
          NUvations 2024: A Bulldog's Solution Innovation Pitch
        </p>
        <p className={styles.description}>
          Welcome to iNUvations 2024: A Bulldog's Solution Innovation Pitch, an
          electrifying event where ingenuity takes center stage!
        </p>
        <p className={styles.date}>January 12, 2024</p>

        <button className={styles.voteButton}>Vote</button>
      </div>
    </>
  );
}
