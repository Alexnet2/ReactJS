import { CompleteChallenges } from "../components/CompleteChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExprienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import { CountDownProvider } from "../context/CountDownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../context/ChallengeContext";

interface HomeProps {
  level: number;
  cuurrentExperience: number;
  challengeCompleted: number;
}
export default function home(props:HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />

              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    },
  };
};
