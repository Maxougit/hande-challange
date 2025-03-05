import React, { useState } from "react";

function ChallengeWheel({ challenges }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const spinWheel = () => {
    if (spinning || challenges.length === 0) return;

    setSpinning(true);
    setSelectedChallenge(null);

    const spins = Math.floor(Math.random() * 8) + 8; // between 8 and 15 full rotations
    const finalAngle = Math.random() * 360;
    const extraSpin = Math.random() * 180;
    const newRotation = spins * 360 + finalAngle + extraSpin;
    const newRotationTotal = rotation + newRotation;
    setRotation(newRotationTotal);

    setTimeout(() => {
      const normalizedRotation = newRotationTotal % 360;
      const pointerAngle = (360 - normalizedRotation) % 360;

      // Calculate the weighted segments
      const totalWeight = challenges.reduce(
        (sum, challenge) => sum + Number(challenge.weight),
        0
      );
      let cumulativeAngle = 0;
      let chosen = null;
      for (let i = 0; i < challenges.length; i++) {
        const segmentAngle = (challenges[i].weight / totalWeight) * 360;
        if (
          pointerAngle >= cumulativeAngle &&
          pointerAngle < cumulativeAngle + segmentAngle
        ) {
          chosen = challenges[i].text;
          break;
        }
        cumulativeAngle += segmentAngle;
      }
      setSelectedChallenge(chosen);
      setSpinning(false);
    }, 5000);
  };

  // Compute total weight for drawing
  const totalWeight = challenges.reduce(
    (sum, challenge) => sum + Number(challenge.weight),
    0
  );

  return (
    <div style={styles.outerContainer}>
      <div style={styles.wheelContainer}>
        <div style={styles.wheelWrapper}>
          <div
            style={{
              ...styles.wheel,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 5s cubic-bezier(0.33, 1, 0.68, 1)"
                : "none",
            }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300">
              <g transform="translate(150,150)">
                {(() => {
                  let currentAngle = 0;
                  return challenges.map((challenge, index) => {
                    const segmentAngle = (challenge.weight / totalWeight) * 360;
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + segmentAngle;
                    currentAngle += segmentAngle;
                    const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                    const startRadians = (Math.PI / 180) * startAngle;
                    const endRadians = (Math.PI / 180) * endAngle;
                    const x1 = 150 * Math.cos(startRadians);
                    const y1 = 150 * Math.sin(startRadians);
                    const x2 = 150 * Math.cos(endRadians);
                    const y2 = 150 * Math.sin(endRadians);
                    const pathData = `
                      M 0 0
                      L ${x1} ${y1}
                      A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2}
                      Z
                    `;
                    const midAngle = startAngle + segmentAngle / 2;
                    const midRadians = (Math.PI / 180) * midAngle;
                    const textX = 75 * Math.cos(midRadians);
                    const textY = 75 * Math.sin(midRadians);
                    // Utilise une teinte variant selon l'index
                    const hue = (index / challenges.length) * 360;
                    const fillColor = `hsl(${hue}, 70%, 60%)`;
                    return (
                      <g key={index}>
                        <path
                          d={pathData}
                          fill={fillColor}
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#fff"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {challenge.text}
                        </text>
                      </g>
                    );
                  });
                })()}
              </g>
            </svg>
          </div>
          <div style={styles.pointer}></div>
        </div>
        <button
          onClick={spinWheel}
          style={styles.button}
          disabled={spinning || challenges.length === 0}
        >
          {spinning ? "Spinning..." : "Spin the Wheel"}
        </button>
      </div>
      {selectedChallenge && (
        <div style={styles.resultContainer}>
          <h2>Selected Challenge: {selectedChallenge}</h2>
        </div>
      )}
    </div>
  );
}

const styles = {
  outerContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "400px",
  },
  wheelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wheelWrapper: {
    position: "relative",
    width: "300px",
    height: "300px",
  },
  wheel: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  pointer: {
    position: "absolute",
    top: "50%",
    right: "-10px",
    transform: "translateY(-50%) rotate(180deg)",
    width: "0",
    height: "0",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: "20px solid #333",
  },
  button: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  resultContainer: {
    position: "absolute",
    bottom: "-15px",
    textAlign: "center",
    width: "100%",
    fontSize: "70%",
  },
};

export default ChallengeWheel;
