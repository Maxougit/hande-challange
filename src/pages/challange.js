"use client";

import React, { useState } from "react";
import ChallengeWheel from "../components/ChallengeWheel";
import ChallengeEditor from "../components/ChallengeEditor";

export default function Page() {
  const defaultChallenges = process.env.NEXT_PUBLIC_DEFAULT_CHALLENGES
    ? process.env.NEXT_PUBLIC_DEFAULT_CHALLENGES.split(",")
    : ["Challenge 1", "Challenge 2", "Challenge 3"];

  const [challenges, setChallenges] = useState(defaultChallenges);

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <ChallengeEditor
          style={styles.editor}
          challenges={challenges}
          setChallenges={setChallenges}
        />
        <div style={styles.wheelContainer}>
          <ChallengeWheel challenges={challenges} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  },
  contentWrapper: {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    gap: "2rem",
    padding: "0 2rem",
    alignItems: "center",
  },
  editor: {
    flex: "0 0 300px",
  },
  wheelContainer: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
