import { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import styles from "../styles/components/CompleteChallenges.module.css";

export function CompleteChallenges() {
  const { challengesComplete } = useContext(ChallengeContext);
  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesComplete}</span>
    </div>
  );
}
