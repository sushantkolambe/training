const secDiv = document.getElementById('sec');
const minDiv = document.getElementById('min');
const hourDiv = document.getElementById('hour');
const start = document.getElementById('start');
const second_hand = document.querySelector('.sec');


let secs=0;


function updateClock(){
    if(secs > 0){
        secs--;
        if(secs <= 10){
            second_hand.style.backgroundColor = "red";
        }
        let sec = secs / 60;

        secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
    }
    else{
        document.getElementById("timer_ended").innerHTML = "Timer Ended";
    }
}

let pause = false;
let pause_sec = 0;

function pause_timer(){
    pause = true;
    pause_sec = secs;
    secs = 0;
}

function start_timer(){
    pause_sec == 0 ? secs = document.getElementById('secs').value : secs = pause_sec;
    if(secs < 0){
        alert("Please enter positive value of seconds");
    }
    else{
        setInterval(updateClock, 1000);
    }
}

function stop_timer(){
    secs = 0;
    alert("Timer stopped");
}

function reset_timer(){
    secs = 0;
    secDiv.style.transform = "rotate(" + 0 + "deg)";
    alert("Timer Reset");
}
// updateClock();