import styles from "../styles/components/CountDown.module.css";
import { useState, useEffect, useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { CountDownContext } from "../context/CountDownContext";

export function CountDown() {
  const {
    minutes,
    seconds,
    hasFinish,
    active,
    startCountDown,
    resetCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRigth] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRigth}</span>
        </div>
      </div>
      {hasFinish ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {active ? (
            <button
              onClick={resetCountDown}
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              onClick={startCountDown}
              type="button"
              className={styles.countDownButton}
            >
              Inicio um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
