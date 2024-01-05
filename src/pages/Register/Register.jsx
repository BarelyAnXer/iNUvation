import React from "react";
import { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/logo.png";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [yearAndSection, setYearAndSection] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const notify = () => toast("what the heck");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User", user);
      // dispatch({ type: "LOGIN", payload: user });
      // navigate("/");

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        studentID,
        yearAndSection,
        email,
        username,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div className={styles.imgContainer}>
        <p className={styles.title}>
          I<span className={styles.welcomeDifferent}>NU</span>VATION
        </p>
        <img className={styles.logo} src={logo} alt="" />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.row}>
          <div>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="Zye"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Gazzingan"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label htmlFor="">Student ID</label>
            <input
              type="text"
              placeholder="2021-160874"
              className={styles.input}
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Year & Section</label>
            <input
              type="text"
              placeholder="ITE 211"
              className={styles.input}
              value={yearAndSection}
              onChange={(e) => setYearAndSection(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="KikiamNiErnest2@gmail.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Hatdog Malaki"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="*********"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          placeholder="*********"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p>{error}</p>}

        <button className={styles.loginButton} onClick={handleRegister}>
          Register
        </button>

        <p className={styles.or}>
          &#9473;&#9473;&#9473;&#9473;&#9473; or
          &#9473;&#9473;&#9473;&#9473;&#9473;
        </p>

        <p className={styles.dontHave}>
          Already have an account? <span className={styles.signUp}>Login</span>
        </p>
      </div>
    </div>
  );
}
