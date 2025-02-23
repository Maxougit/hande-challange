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
  // L'éditeur est positionné en absolu sur la gauche, centré verticalement
  editorWrapper: {
    position: "absolute",
    top: "50%",
    left: "2rem",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  // La roue est dans un conteneur en flex qui occupe toute la hauteur de l'écran, garantissant ainsi un centrage complet
  wheelWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
