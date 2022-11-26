// // //timer
// // timer__blocks-list
// // timer__items
// // timer__window
// class Timer {
//   constructor() {}
//   onStart() {}
//   //   get selector() {
//   //     return;
//   //   }
//   set selector(newSelector) {
//     return;
//   }
// }

let timerIntervalId = null;
function onStart({ userMins }) {
  if (typeof userMins !== 'number') {
    console.log(userMins, 'is not a number! Enter correct value...');
    return;
  }
  let userTimeSelect = userMins * 60;
  let actualTime = 0;
  timerIntervalId = setInterval(() => {
    let resultTime = userTimeSelect - actualTime;

    actualTime += 1;
    renderTime(convertSeconds(resultTime));
    console.log(resultTime);
    if (!resultTime) {
      return onTimesUp();
    }
  }, 1000);
}
function renderTime(timeValueObj) {
  const timeObj = timeValueObj;
  const keys = Object.keys(timeObj);
  for (const key of keys) {
    const timerWindow = document.querySelector(`.timer__window[data-${key}]`);
    timerWindow.textContent = timeObj[key];
  }
}
function convertSeconds(time) {
  const minutes = addLeadingZero(Math.floor(time / 60));
  const seconds = addLeadingZero(time % 60);
  // const minutes = Math.floor(time / 60);
  // const seconds = time % 60;
  console.log({ minutes, seconds, time });
  return { minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onTimesUp() {
  clearInterval(timerIntervalId);
  console.log('stoped');
}

const userInput = 20;
onStart({ userMins: 45 });
// ================================================================================================
