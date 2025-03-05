"use client";

import React, { useState } from "react";
import ChallengeWheel from "../components/ChallengeWheel";
import ChallengeEditor from "../components/ChallengeEditor";

export default function Page() {
  const defaultChallenges = process.env.NEXT_PUBLIC_DEFAULT_CHALLENGES
    ? process.env.NEXT_PUBLIC_DEFAULT_CHALLENGES.split(",").map((ch) => ({
        text: ch,
        weight: 1,
      }))
    : [
        { text: "Challenge 1", weight: 1 },
        { text: "Challenge 2", weight: 1 },
        { text: "Challenge 3", weight: 1 },
      ];

  const [challenges, setChallenges] = useState(defaultChallenges);

  return (
    <div style={styles.container}>
      <div style={styles.editorWrapper}>
        <ChallengeEditor
          challenges={challenges}
          setChallenges={setChallenges}
        />
      </div>
      <div style={styles.wheelWrapper}>
        <ChallengeWheel challenges={challenges} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "#f5f5f5",
  },
  editorWrapper: {
    position: "absolute",
    top: "50%",
    left: "2rem",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  wheelWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
