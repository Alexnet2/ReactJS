import { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { CountDownContext } from "../context/CountDownContext";
import styles from "../styles/components/ChallengeBox.module.css";
export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengeContext
  );
  const { resetCountDown } = useContext(CountDownContext);
  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountDown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountDown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challangeActive}>
          {console.log("estou aqui ")}
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              onClick={handleChallengeFailed}
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSucceeded}
              type="button"
              className={styles.challengeSucceededButton}
            >
              {" "}
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
