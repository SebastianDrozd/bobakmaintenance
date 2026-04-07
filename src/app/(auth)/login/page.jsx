"use client";
import { loginUser } from "@/api/auth";
import { AuthContext } from "@/util/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import styles from "../../../styles/LoginPage.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingSpinnerLogin from "@/components/LoadingSpinnerLogin";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();
  const [isLoading,setIsloading] = useState(false);

  const handleLogin = () => {
    setIsloading(true)
    const login = {
      username,
      password,
    };

    loginUser(login)
      .then((data) => {
        console.log("data", data);
        router.replace("/dashboard");
      })
      .catch((err) => {
        if (err.status == 400) {
          setIsErr(true);
          setErrMessage("Username/Password can't be blank");
        }
        if (err.status == 401) {
          setIsErr(true);
          setErrMessage("Invalid Credentials");
        }
      })
      .finally(() => {
        setIsloading(false)
      })
      ;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className={styles.container}
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Bobak Maintenance</h1>
        <div className={styles.formContents}>
          <input
            className={styles.inputField}
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.inputField}
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.loginBtn} onClick={handleLogin}>
            {isLoading ? <LoadingSpinnerLogin/> : "Login"}
          </button>
          <p className={styles.disclosure}>
            Trouble signing in? Contact{" "}
            <a className={styles.link}>IT@bobak.com</a>
          </p>

          <p className={`${styles.err} ${isErr && styles.errShow}`}>
            {errMessage}
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
