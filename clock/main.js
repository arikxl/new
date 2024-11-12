const hoursH1 = document.getElementById('hoursH1');
const minutesH1 = document.getElementById('minutesH1');
const secondsH1 = document.getElementById('secondsH1');
const hoursProgress = document.getElementById('hoursProgress');
const minutesProgress = document.getElementById('minutesProgress');
const secondsProgress = document.getElementById('secondsProgress');
const date = document.getElementById('date');

setInterval(() => {
    let time = new Date()

    let hour = time.getHours()
    hoursH1.innerHTML = addZero(hour);
    hoursProgress.value = hour;

    let minute = time.getMinutes();
    minutesH1.innerHTML = addZero(minute);
    minutesProgress.value = minute;

    let second = time.getSeconds();
    secondsH1.innerHTML = addZero(second);
    secondsProgress.value = second;
    
    date.innerHTML = time.toDateString();
}, 1000);

function addZero(number) { 
    if (number < 10) {
        return  '0' + number
    } else { 
        return number
    }
}