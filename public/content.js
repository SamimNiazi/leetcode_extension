let problemText;

function runSolver() {
	//code to send message to open notification. This will eventually move into my extension logic
	chrome.runtime.sendMessage({type: "leetcode-solver-problem", data: {
		problemText,
	}});
}

const intervalTime = 100;
const maxTimeout = 5000
let intervalCounter = 0
const interval = setInterval(() => {
	let descriptionElement = document.querySelector('[data-track-load="description_content"]');

    if (descriptionElement) {
        problemText = descriptionElement.innerText;
        runSolver()
        clearInterval(interval)
    } else {intervalCounter += intervalTime}
    if (intervalCounter >= maxTimeout) {
        clearInterval(interval)
    }
	

}, intervalTime);


