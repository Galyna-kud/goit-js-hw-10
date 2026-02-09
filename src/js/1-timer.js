import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const btnTimerStart = document.querySelector("button[data-start]")
const daysView = document.querySelector("[data-days]");
const hoursView = document.querySelector("[data-hours]");
const minutesView = document.querySelector("[data-minutes]");
const secondsView = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let intervalId = null;

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        if (userSelectedDate < new Date()) {
             iziToast.error({ title: "Error", message: "Please choose a date in the future", position: "topRight" });
            btnTimerStart.disabled = true
        } else {
            btnTimerStart.disabled = false
        }
    },
});

btnTimerStart.addEventListener("click", () => {
    if (!userSelectedDate) return;
    
    intervalId = setInterval(() => {
        const currentDate = new Date();
        const differentDate = userSelectedDate - currentDate;
        
        btnTimerStart.disabled = true;
        input.disabled = true;


        if (differentDate <= 0) {
            clearInterval(intervalId);
            input.disabled = false;
            
            clockView({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            return
        }

        const time = convertMs(differentDate);
        clockView(time)
    }, 1000)
    
    
})

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function clockView({ days, hours, minutes, seconds }) {
    daysView.textContent = addLeadingZero(days);
    hoursView.textContent = addLeadingZero(hours);
    minutesView.textContent = addLeadingZero(minutes);
    secondsView.textContent = addLeadingZero(seconds);
}