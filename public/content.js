let problemText;
let difficultyText;
let titleText;

function runSolver() {
  //code to send message to open notification. This will eventually move into my extension logic
  chrome.runtime.sendMessage({
    type: "leetcode-solver-problem",
    data: {
      problemText,
      difficultyText,
      titleText
    },
  });
}

const intervalTime = 100;
const maxTimeout = 5000;
let intervalCounter = 0;
const interval = setInterval(() => {
  let descriptionElement = document.querySelector(
    '[data-track-load="description_content"]'
  );
  let difficultyElement = document.querySelector('[class*="text-difficulty"]');
  let titleElement = document.querySelector('.text-title-large')

  

  if (descriptionElement && difficultyElement) {
    problemText = descriptionElement.innerText;
    difficultyText = difficultyElement.innerText;
    titleText = titleElement.innerText;
    runSolver();
    clearInterval(interval);
  } else {
    intervalCounter += intervalTime;
  }
  if (intervalCounter >= maxTimeout) {
    clearInterval(interval);
  }
}, intervalTime);
