import React, { useState } from "react";

function ChallengeEditor({ challenges, setChallenges }) {
  const [newChallengeText, setNewChallengeText] = useState("");
  const [newChallengeWeight, setNewChallengeWeight] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const addChallenge = () => {
    if (newChallengeText.trim() === "") return;
    setChallenges([
      ...challenges,
      { text: newChallengeText.trim(), weight: Number(newChallengeWeight) },
    ]);
    setNewChallengeText("");
    setNewChallengeWeight(1);
  };

  const removeChallenge = (indexToRemove) => {
    setChallenges(challenges.filter((_, index) => index !== indexToRemove));
  };

  const updateChallenge = (index, property, newValue) => {
    const updatedChallenges = challenges.map((challenge, i) =>
      i === index ? { ...challenge, [property]: newValue } : challenge
    );
    setChallenges(updatedChallenges);
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={styles.toggleButton}
      >
        {isVisible ? "Hide Editor" : "Show Editor"}
      </button>

      {isVisible && (
        <div style={styles.editorContainer}>
          <h2>Edit Challenges</h2>
          {challenges.map((challenge, index) => (
            <div key={index} style={styles.editorRow}>
              <input
                type="text"
                value={challenge.text}
                onChange={(e) => updateChallenge(index, "text", e.target.value)}
                style={styles.input}
              />
              <input
                type="number"
                min="1"
                value={challenge.weight}
                onChange={(e) =>
                  updateChallenge(index, "weight", Number(e.target.value))
                }
                style={styles.inputWeight}
              />
              <button
                onClick={() => removeChallenge(index)}
                style={styles.removeButton}
              >
                Delete
              </button>
            </div>
          ))}
          <div style={styles.editorRow}>
            <input
              type="text"
              placeholder="New challenge"
              value={newChallengeText}
              onChange={(e) => setNewChallengeText(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Weight"
              min="1"
              value={newChallengeWeight}
              onChange={(e) => setNewChallengeWeight(Number(e.target.value))}
              style={styles.inputWeight}
            />
            <button onClick={addChallenge} style={styles.addButton}>
              Add
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
    width: "400px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  editorRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  inputWeight: {
    width: "50px",
    padding: "8px",
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
