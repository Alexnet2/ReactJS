import { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const {level} = useContext(ChallengeContext)
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Alexnet2.png" alt="Alex Sandro" />
      <div>
        <strong>Alex Sandro</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
