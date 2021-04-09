import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountDownProviderProps {
  children: ReactNode;
}
interface CountDownContextData{
    minutes:number;
    seconds:number;
    hasFinish:boolean;
    active:boolean;
    startCountDown:()=>void;
    resetCountDown:()=>void
}
export const CountDownContext = createContext({} as CountDownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountDownProvider({ children }: CountDownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);
  const [time, setTime] = useState(0.1 * 60);
  const [active, setActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setActive(false);
    setTime(0.1 * 60);
    setHasFinish(false);
  }
  useEffect(() => {
    if (active && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (active && time === 0) {
      setHasFinish(true);
      setActive(false);
      startNewChallenge();
    }
  }, [active, time]);

  return (
    <CountDownContext.Provider value={{minutes,seconds,hasFinish,active,startCountDown,resetCountDown}}>{children}</CountDownContext.Provider>
  );
}
