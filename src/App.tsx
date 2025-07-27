import { useEffect, useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log(apiKey)
const ai = new GoogleGenAI({
  apiKey: apiKey,
});

function App() {
  interface Problem {
    problemText: string;
    difficultyText: string;
    titleText: string;
  }

  const [problem, setProblem] = useState<Problem | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get-current-problem" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message error:", chrome.runtime.lastError.message);
        return;
      }
      setProblem(response);
    });
  }, []);

  const getHint = async () => {
    if (!problem) return;
    setLoading(true);
    try {
      const prompt = `Give a helpful hint (not the solution) for the LeetCode problem: "${problem.titleText}". Problem description: ${problem.problemText}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      console.log(response.text);

      const hintText = response.text || "No hint available.";
      setHint(hintText);
    } catch (error) {
      console.error("Failed to fetch hint:", error);
      setHint("There was an error fetching the hint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <div className="header">
        <img src="logo.png" alt="LeetCode Helper Logo" className="logo" />
        <p className="header-title">Leet Code Assistant</p>
      </div>

      <div className="card">
        {problem ? (
          <>
            <p>
              <strong className="problem-title">{problem.titleText}</strong>
            </p>
            <p>
              <strong>Current Problem:</strong> {problem.problemText}
            </p>
            <p>
              <strong>Difficulty:</strong> {problem.difficultyText}
            </p>

            <button className="btn" onClick={getHint} disabled={loading}>
              {loading ? "Loading..." : "Get Hint"}
            </button>

            {hint && (
              <div className="hint-box">
                <strong>Hint:</strong>
                <p>{hint}</p>
              </div>
            )}
          </>
        ) : (
          <p className="problem-title">
            No LeetCode problem was found on this page. Try refreshing.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
