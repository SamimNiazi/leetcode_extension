let currentProblemState = null

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "leetcode-solver-problem") {
        currentProblemState = message.data;
    } else if (message.type === "get-current-problem") {
        console.log("Sending current problem state:", currentProblemState);
        sendResponse(currentProblemState);
    }
    return true
});