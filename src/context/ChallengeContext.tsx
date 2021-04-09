import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesComplete: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  activeChallenge: challenge;
}
interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  cuurrentExperience: number;
  challengeCompleted: number;
}
export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [levelModalOpen, setLevelModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(
    rest.cuurrentExperience ?? 0
  );
  const [challengesComplete, setChallengesComplete] = useState(
    rest.challengeCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  function levelUp() {
    setLevel(level + 1);
    setLevelModalOpen(true);
  }
  function closeLevelUpModal(){
    setLevelModalOpen(false);
  }
  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesComplete", String(challengesComplete));
  }, [level, currentExperience, challengesComplete]);

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenge(challenge);
    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification("Novo desafio ", {
        body: `valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesComplete(challengesComplete + 1);
    }
  }
  return (
    <ChallengeContext.Provider
      value={{
        level,
        levelUp,
        startNewChallenge,
        currentExperience,
        experienceToNextLevel,
        challengesComplete,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {levelModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
