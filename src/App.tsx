import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [leetCodeProblemInfo, setLeetCodeProblemInfo] = useState()
	useEffect(() => {
		let interval: number | undefined; 

		const fetchCurrentProblemInfo  = () => {
			chrome.runtime.sendMessage({
				type: "get-current-problem"
			}, (response) => {
        console.log(response)
				if (response) {
					clearInterval(interval)
					console.log("got problem", response)
					setLeetCodeProblemInfo(response)
				}
			})
		}

		interval = setInterval(() => {
			fetchCurrentProblemInfo()
		}, 100);

		return () => {
			clearInterval(interval)
		}
	}, [])

  return (
    <div className="popup-container">
      <div className="header">
        <img src="logo.png" alt="LeetCode Helper Logo" className="logo" />
        <p className="header-title">Leet Code Assistant</p>
      </div>

      <div className="card">
        <p>
          <strong>Current Problem:</strong> {leetCodeProblemInfo}
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
