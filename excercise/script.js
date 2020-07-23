var workouts = {};

getJSONFile();

/* Ta bort variabeln ovan och skapa en extern JSON fil istället att förvara alla övningar i */

function getWorkout() {

    let workoutIntensityIndex = document.getElementById("selectIntensity").selectedIndex;
    let workoutArea = document.getElementById("selectArea").value;
    let workoutTime = document.getElementById("setTime").value;

    let availableWorkoutsArea = getAvailableExcercisesForArea(workoutArea);
    let amountOfWorkouts = calculateWorkoutTime(workoutTime);

    let randomizedWorkouts = randomizeWorkouts(availableWorkoutsArea, amountOfWorkouts);

    showWorkouts(workoutIntensityIndex, randomizedWorkouts);

    switchLayout(true, "hide", "workout-selection");
    switchLayout(false, "hide", "workout-workout");


}

function getAvailableExcercisesForArea(workoutArea) {

    let index = 0;
    let amount = 0;
    let availableWorkouts = {};

    availableWorkouts["amount"] = 0;

    if (workoutArea == "fullBody") {
        for (let key in workouts) {
            availableWorkouts[Object.keys(workouts)[index]] = (workouts[key]);
            index++;
        }

        availableWorkouts["amount"] = index;

    } else {
        for (let key in workouts) {
            if (workouts[key][0] == workoutArea) {
                availableWorkouts[Object.keys(workouts)[index]] = (workouts[key]);
                amount++;
            }

            availableWorkouts["amount"] = amount;

            index++;
        }
    }

    return availableWorkouts;

}

/* Intensity = light, medium, high. Light = 20 sec, Medium = 10 sec, High = 5 sec. */

function calculateWorkoutTime(time) {

    if (time % 1.5 != 0) {

        /* let restTime = Math.round(time % 1.5);
    console.log(restTime); */

        while (time % 1.5 != 0) {
            time--;
        }
    }


    return time / 1.5;

}


function randomizeWorkouts(workouts, amount) {

    let number = [];
    let randomWorkouts = [];
    let workout = {};

    for (let i = 0; i < amount; i++) {
        number.push(i);
    }

    delete workouts.amount;

    for (let i = number.length; i > 0; i--) {

        let randomNumber = Math.floor(Math.random() * number.length);

        randomWorkouts.push(number[randomNumber]);
        number.splice(randomNumber, 1);

    }

    for (let i = 0; i < randomWorkouts.length; i++) {

        let indexNumber = randomWorkouts[i];
        let indexName = Object.keys(workouts)[indexNumber]

        workout[indexName] = workouts[indexName];

    }



    return workout;
}

function showWorkouts(intensity, workouts_here) {

    let rest = 0;
    let work = 0;
    let countdown = 0;
    let workingOut = true;
    let intervalIndex = 0;
    let workoutIndex = 0;

    let imageArea = document.getElementById("card-image-id");
    let workoutText = document.getElementById("workout-text");
    let nextWorkoutText = document.getElementById("next-excercise");
    let infoButton = document.getElementById("workout-info");
    let workIntervals = document.getElementsByClassName("work");
    let restIntervals = document.getElementsByClassName("rest");
    let activeTextInterval = document.getElementById("text-active");
    let activeInterval = document.getElementById("active");
    let amountOfWorkouts = Object.keys(workouts_here);

    switch (intensity) {
        case 0:
            rest = 20;
            work = 10;
            break;
        case 1:
            rest = 10;
            work = 20;
            break;
        case 2:
            rest = 5;
            work = 25;
            break;
    }

    countdown = work;
    activeTextInterval.innerText = countdown;

    Array.from(workIntervals).forEach(function(textElement){
        textElement.textContent = work;
    });

    Array.from(restIntervals).forEach(function(textElement){
        textElement.textContent = rest;
    });

    let currentWorkoutName = Object.keys(workouts_here)[workoutIndex];

    imageArea.src = workouts_here[currentWorkoutName][1];
    workoutText.textContent = Object.keys(workouts_here)[workoutIndex].toUpperCase();
    infoButton.setAttribute("href", workouts_here[currentWorkoutName][2]);
    nextWorkoutText.textContent = Object.keys(workouts_here)[workoutIndex + 1];

    setInterval(function() {

        countdown--;

        if (countdown < 0) {

            intervalIndex++;

            if (intervalIndex > 5) {
                workoutIndex++;
                intervalIndex = 0;

                if (workoutIndex > amountOfWorkouts.length) {
                    clearInterval(setInterval);
                }

                Array.from(workIntervals).forEach(function(textElement){
                    textElement.textContent = work;
                });

                Array.from(restIntervals).forEach(function(textElement){
                    textElement.textContent = rest;
                });

                currentWorkoutName = Object.keys(workouts_here)[workoutIndex];

                imageArea.src = workouts_here[currentWorkoutName][1];
                workoutText.textContent = Object.keys(workouts_here)[workoutIndex].toUpperCase();
                infoButton.setAttribute("href", workouts_here[currentWorkoutName][2]);
                nextWorkoutText.textContent = Object.keys(workouts_here)[workoutIndex + 1];

                activeInterval.removeAttribute("id")
                activeInterval = activeInterval.parentElement.firstElementChild;
                activeInterval.setAttribute("id", "active");

                activeTextInterval = activeInterval.firstElementChild;

            } else {

                activeInterval.removeAttribute("id")
                activeInterval = activeInterval.nextElementSibling;
                activeInterval.setAttribute("id", "active");

                activeTextInterval = activeInterval.firstElementChild;

            }

            if (workingOut) {
                countdown = rest;
                workingOut = false;
            } else {
                countdown = work;
                workingOut = true;
            }

        } else {

            activeTextInterval.innerText = countdown;

        }

    }, 1000);
}
function stopWorkoutAndGoBack() {



    switchLayout(true, "hide", "workout-workout");
    switchLayout(false, "hide", "workout-selection");
}

function getJSONFile() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "workouts.json", false);

    xhr.onload = function() {
        if (this.status == 200) {
            let workoutJSON = JSON.parse(this.responseText);
            workouts = workoutJSON;
        } else if (this.status == 404){
            console.log("Error");
        };
    };

    xhr.send();
}

/* Simple remove and hide, especially good for showing and hiding elements */
function switchLayout(add, className, idName) {
    let elementToBeChanged = document.getElementById(idName);

    if (add) {

        elementToBeChanged.classList.add(className);

    } else if (!add) {

        elementToBeChanged.classList.remove(className);

    }

}
