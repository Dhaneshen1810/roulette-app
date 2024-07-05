"use client";
import { useState } from "react";
import { predictNextSection } from "../utils/predict";

const sectionsObj: any = {
  "1": [32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13],
  "2": [36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20],
  "3": [14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
};

export default function Home() {
  const [sequence, setSequence] = useState("");
  const [predictedSection, setPredictedSection] = useState<number | null>(null);

  const handleSubmit = () => {
    // Convert input sequence to numbers array
    const numbersArray = sequence
      .split(" ")
      .map((num) => parseInt(num.trim(), 10));

    // Predict the next section based on the numbers array
    const nextSection = predictNextSection(numbersArray);

    // Update state with predicted section
    setPredictedSection(nextSection);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-8">Roulette Section Predictor</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded mr-2 text-black"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter sequence of numbers..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Predict
        </button>
      </div>

      {predictedSection !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Predicted next section: {predictedSection}
          </p>
          <p className="text-lg font-semibold">
            Numbers: {sectionsObj[predictedSection].join(", ")}
          </p>
        </div>
      )}
    </main>
  );
}
