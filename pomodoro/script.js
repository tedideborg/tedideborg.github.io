function pomodoroTimer() {
  const bar = document.getElementById("bar");
  const arrow = document.getElementById("holder");

  const timer = document.getElementById("timer");
  const head = document.getElementById("head");
  head.innerHTML = "WORK";

  const work = document.getElementById("work").value;
  const pause = document.getElementById("pause").value;
  const rest = document.getElementById("rest").value;

  let working = true;
  let resting = false;
  let lenght_bar = bar.offsetWidth / 7; // Gets the lenght of each bar
  let lenght_move = (lenght_bar / (working ? work : pause)) / 60; // Divides the lenght of each bar with the time

  let posX = 0;
  let times = 0;
  let linePos = 0;
  let lastRound = 0;

  displayTime(working, work, pause, rest, 0, timer);

  Timer = window.setInterval(function countDown() {
    times++;
    displayTime(working, work, pause, rest, times, timer, resting);
    
    if (resting) {
      if (times >= rest*60) {
        clearInterval(Timer);
        pomodoroTimer();
      }
    } else if (times >= (working ? work*60 : pause*60)) {
      working = (working ? false : true);
      lenght_move = (lenght_bar / (working ? work : pause)) / 60;
      times = 0;
      
      lastRound++;
      
      if (lastRound == 7){
        linePos = 0;
        head.innerHTML = "REST";
        resting = true
      } else {
        linePos += lenght_bar;
        head.innerHTML = (working ? "WORK" : "PAUSE");
      }
      posX = linePos;
      arrow.style.marginLeft = posX + "px";
    } else {
      posX += lenght_move;
      arrow.style.marginLeft = posX + "px";
    }
  }, 1000);
}

function displayTime(working, work, pause, rest, times, timer, resting = false) {
  
  let time = resting ? rest : (working ? work : pause);

  let minutes = 0;
  let seconds = 0;

  time *= 60;
  time -= times;
  minutes = parseInt(time / 60, 10);
  seconds = parseInt(time % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = minutes + " : " + seconds;

}

function buttonClicked(run) {
  switch (run) {
    case "timer":
      changeClass(true, "hide", "frontPage");
      changeClass(false, "hide", "timerPage");
      pomodoroTimer();
      break;
    case "back":
      changeClass(true, "hide", "timerPage");
      changeClass(false, "hide", "frontPage");
      clearInterval(Timer);
      break;
  }
}

function changeClass(add, className, idName) {
  let elementToBeChanged = document.getElementById(idName);
  add ? elementToBeChanged.classList.add(className) : elementToBeChanged.classList.remove(className);
}