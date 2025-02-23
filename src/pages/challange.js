import React, { useState, useRef, useEffect } from "react";

function ChallengeWheel({
  size = 400,
  items = [],
  colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
  onSpinEnd = (item) => console.log(`Landed on: ${item}`),
}) {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const drawWheel = (currentRotation) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    const totalItems = items.length;
    if (!totalItems) return;

    const arcSize = (2 * Math.PI) / totalItems;
    ctx.clearRect(0, 0, size, size);

    items.forEach((item, index) => {
      const startAngle = index * arcSize + currentRotation;
      const endAngle = (index + 1) * arcSize + currentRotation;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.fillText(item, radius - 10, 5);
      ctx.restore();
    });
  };

  const spin = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);

    const startRotation = rotation;
    const totalSpins = 5;
    const totalRotation = 2 * Math.PI * totalSpins;
    const randomOffset = Math.random() * 2 * Math.PI;
    const finalRotation = startRotation + totalRotation + randomOffset;
    const duration = 4000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 4);
      const currentRotation =
        startRotation + (finalRotation - startRotation) * easing;

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const totalItems = items.length;
        const selectedIndex = Math.floor(
          (totalItems -
            ((finalRotation % (2 * Math.PI)) / (2 * Math.PI)) * totalItems) %
            totalItems
        );
        onSpinEnd(items[selectedIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation, items, colors, size]);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          top: "-25px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid #e53e3e",
          zIndex: 11,
        }}
      />
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute top-0 left-0 w-full h-full shadow-2xl rounded-full"
      />
      <button
        onClick={spin}
        disabled={isSpinning}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-full bg-green-500 text-white font-bold border-2 border-white cursor-pointer hover:bg-green-600 shadow-xl z-10 disabled:bg-gray-300 disabled:border-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        SPIN
      </button>
    </div>
  );
}

export default function ChallengeWheelEditor() {
  const [challenges, setChallenges] = useState([
    "Challenge 1",
    "Challenge 2",
    "Challenge 3",
    "Challenge 4",
    "Challenge 5",
    "Challenge 6",
  ]);
  const [newChallenge, setNewChallenge] = useState("");

  const handleAddChallenge = () => {
    if (newChallenge.trim()) {
      setChallenges((prev) => [...prev, newChallenge.trim()]);
      setNewChallenge("");
    }
  };

  const handleRemoveChallenge = (index) => {
    setChallenges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpinEnd = (item) => {
    alert(`La roue a atterri sur: ${item}`);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
    >

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-60 focus:outline-none focus:ring focus:border-blue-300"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
          placeholder="Add a challenge"
        />
        <button
          onClick={handleAddChallenge}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="mb-6 w-full max-w-sm space-y-2">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span className="text-gray-800 font-medium">{challenge}</span>
            <button
              onClick={() => handleRemoveChallenge(index)}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <ChallengeWheel items={challenges} onSpinEnd={handleSpinEnd} />
    </div>
  );
}
