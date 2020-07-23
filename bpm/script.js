// I'm drawing the heart with html canvas
function drawHeart() {
    const canvas = document.getElementById("heartIcon");
    const context = canvas.getContext("2d");

    context.fillStyle ="#C20000";
    
    context.arc(75, 75, 50, 0, Math.PI * 2, true);
    context.fill();
    context.arc(140, 75, 50, 0, Math.PI * 2, true);
    context.fill();

    context.beginPath();
    context.moveTo(32, 100);
    context.lineTo(184, 100);
    context.lineTo(108, 230);
    context.fill();
}

drawHeart();

// -- TAP BPM function --

var times = 0;
var timeStart = 0;
var bpm = 0;

const bpmIndicator = document.getElementById("bpm");
const pulsIndicator = document.getElementById("pulse");

function clickedBPM() {
    tapBPM();
}

// A function for checking if space is clicked, if it is, this is run.
function pressedKeyboardBPM(event) {
    let x = event.which;
    if (x == 32) {
        tapBPM();
    }
}

// Main function, for counting the BPM
function tapBPM() {
    times++;

    currentTime = new Date();
    millisec = currentTime.getTime();

    addClassWithTimer("heartIcon", "clicked");
    
    if (times == 1) {
        timeStart = millisec;
        bpm = 88;
    } else {
        bpm = 60000 * times / (millisec - timeStart);

        // Just to show if you have resting-pulse or working pulse
        if (Math.round(bpm) < 80) {
            pulsIndicator.textContent = "resting pulse";
        } else {
            pulsIndicator.textContent = "working pulse";
        }

    }

    // Skriver ut bpm till h1 elementet samt rundar av talet för att vara mer läsbart
    bpmIndicator.textContent = Math.round(bpm);

}

// -- Restart from zero --

function resetBPM() {
    times = 0;
    bpm = 0;
    bpmIndicator.textContent = Math.round(bpm);
}

function addClassWithTimer(id, className) {
    const element = document.getElementById(id);
    element.classList.add(className);
    window.setTimeout(function () {removeClass(className, element)}, 80);
}

// A general function to remove classes, nothing special about it.
function removeClass(className, target) {
    target.classList.remove(className);
}