import { useEffect, useState } from "react";
import "./App.css";

function App() {
  interface Problem {
    problemText: string
  }

   const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get-current-problem" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message error:", chrome.runtime.lastError.message);
        return;
      }
      console.log("Current problem state:", response);
      setProblem(response); 
    });
  }, []);

  return (
    <div className="popup-container">
      <div className="header">
        <img src="logo.png" alt="LeetCode Helper Logo" className="logo" />
        <p className="header-title">Leet Code Assistant</p>
      </div>

      <div className="card">
        <p>
          <strong>Current Problem:</strong>{" "}
          {problem?.problemText || "Loading..."}
        </p>
        <p>
          <strong>Difficulty:</strong> Easy
        </p>
        <p>
          <strong>Tags:</strong> Array, Hash Table
        </p>

        <button className="btn">Get Hint</button>
        <button className="btn secondary">Similar Problems</button>
      </div>
    </div>
  );
}

export default App;
