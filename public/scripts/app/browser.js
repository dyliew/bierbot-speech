var startBtn, stopBtn, hypothesisDiv, statusDiv, finalStatusDiv;
var SDK;
var recognizer;
var previousSubscriptionKey;

document.addEventListener("DOMContentLoaded", function () {
    startBtn = document.getElementById("startBtn");
    stopBtn = document.getElementById("stopBtn");
    hypothesisDiv = document.getElementById("hypothesisDiv");
    statusDiv = document.getElementById("statusDiv");
    finalStatusDiv = document.getElementById("finalStatusDiv");

    startBtn.addEventListener("click", function () {
        Setup();

        hypothesisDiv.innerHTML = "";
        RecognizerStart(SDK, recognizer);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener("click", function () {
        RecognizerStop(SDK, recognizer);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    Initialize(function (speechSdk) {
        SDK = speechSdk;
        startBtn.disabled = false;
    });
});

function Setup() {
    var subscriptionKey = 'ea270bab7a9b47c8b4c010d2898e076c';
    var languageOption = 'en-GB';
    var formatOption = 'Simple';
    recognizer = RecognizerSetup(SDK, SDK.RecognitionMode.Interactive, languageOption, SDK.SpeechResultFormat[formatOption], subscriptionKey);
}

function UpdateStatus(status) {
    statusDiv.innerHTML = status;
}

function OnSpeechEndDetected() {
    stopBtn.disabled = true;
}

function OnComplete() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function UpdateRecognizedHypothesis(text) {
    hypothesisDiv.innerHTML = text;
}

function orderBeer() {
    var order = hypothesisDiv.innerHTML;

    fetch('/order', {
        method: 'POST',
        body: JSON.stringify({ order: order }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            finalStatusDiv.innerHTML = json.message;
        })
        .catch(function (error) {
            finalStatusDiv.innerHTML = 'Internal Server Error';
        });
}