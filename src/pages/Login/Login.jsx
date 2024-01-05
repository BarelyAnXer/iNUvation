import React from "react";
import { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const notify = () => toast("");

  const handleSignUp = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("nice", user);
        // navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console(errorCode, errorMessage);
      });
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
        <p className={styles.welcome}>
          Welcome to I<span className={styles.welcomeDifferent}>NU</span>
          VATION!
        </p>
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="KikiamNiErenest2inch@gmail.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="*********"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}

        <p className={styles.forgot}>Forgot Password</p>

        <button className={styles.loginButton} onClick={handleSignUp}>
          Login
        </button>

        <p className={styles.or}>
          &#9473;&#9473;&#9473;&#9473;&#9473; or
          &#9473;&#9473;&#9473;&#9473;&#9473;
        </p>

        <p className={styles.dontHave}>
          Don't have an account? <span className={styles.signUp}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
