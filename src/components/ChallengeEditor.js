import React, { useState } from "react";

function ChallengeEditor({ challenges, setChallenges }) {
  const [newChallenge, setNewChallenge] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const addChallenge = () => {
    if (newChallenge.trim() === "") return;
    setChallenges([...challenges, newChallenge.trim()]);
    setNewChallenge("");
  };

  const removeChallenge = (indexToRemove) => {
    setChallenges(challenges.filter((_, index) => index !== indexToRemove));
  };

  const updateChallenge = (indexToUpdate, newValue) => {
    const updatedChallenges = challenges.map((challenge, index) =>
      index === indexToUpdate ? newValue : challenge
    );
    setChallenges(updatedChallenges);
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={styles.toggleButton}
      >
        {isVisible ? "Masquer l'éditeur" : "Afficher l'éditeur"}
      </button>

      {isVisible && (
        <div style={styles.editorContainer}>
          <h2>Modifier les challenges</h2>
          {challenges.map((challenge, index) => (
            <div key={index} style={styles.editorRow}>
              <input
                type="text"
                value={challenge}
                onChange={(e) => updateChallenge(index, e.target.value)}
                style={styles.input}
              />
              <button
                onClick={() => removeChallenge(index)}
                style={styles.removeButton}
              >
                Supprimer
              </button>
            </div>
          ))}
          <div style={styles.editorRow}>
            <input
              type="text"
              placeholder="Nouveau challenge"
              value={newChallenge}
              onChange={(e) => setNewChallenge(e.target.value)}
              style={styles.input}
            />
            <button onClick={addChallenge} style={styles.addButton}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
  },
  toggleButton: {
    marginBottom: "10px",
    padding: "8px 12px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editorContainer: {
    width: "300px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  editorRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
  },
  removeButton: {
    padding: "8px 12px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addButton: {
    padding: "8px 12px",
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ChallengeEditor;
