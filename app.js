const time = document.querySelector('.time');
const border = document.querySelector('.border');
let startTime = 0;

let events = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "3:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "8:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "6:30",
    endTime: "9:00",
    color: "#f6501e",
    title: "Demo",
  },
  {
    startTime: "11:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:30",
    endTime: "10:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "15:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
];

let eventsSeenTillNow = [];

function calculateWidthZindexMarginLeftOfEvent(start,end) {
  let sArr = start.split(':');
  let sTotalMins = (+sArr[0])*60 + +sArr[1];
  let eArr = end.split(':');
  let eTotalMins = (+eArr[0])*60 + +eArr[1];
  let width=Infinity,zIndex=-Infinity,marginLeft = null;
  if(!eventsSeenTillNow.length) {
    eventsSeenTillNow.push([sTotalMins,eTotalMins,100,0]);
    return [100,0];
  }
  for(let event of eventsSeenTillNow) {
    if(sTotalMins >= event[0] && sTotalMins <= event[1]) {
      if(event[3] >= zIndex) {
        zIndex = event[3];
      }
      if(event[2] <= width) {
        width = event[2];
      }
    }
  }

  if(zIndex=== -Infinity) {
    eventsSeenTillNow.push([sTotalMins,eTotalMins,100,0]);
    return [100,0];
  } 
  eventsSeenTillNow.push([sTotalMins,eTotalMins,width/2,zIndex+1]); 
  marginLeft = border.offsetWidth-Math.floor((Math.floor(width/2)*border.offsetWidth)/100);
  return [Math.floor(width/2),zIndex+1,marginLeft];
}

function calculateHeightOfEvent(start,end) {
  let sArr = start.split(':');
  let eArr = end.split(':');
  let totalMins = (+eArr[0] - +sArr[0])*60 + (+eArr[1] - +sArr[1]);
  return Math.floor(totalMins*2);
}

function calculateDivTop(start) {
  let arr = start.split(':');
  let totalMins = (+arr[0])*60 + +arr[1];
  return Math.floor(totalMins*2);
} 

function populateTimeTable() {
  for(let event of events) {
    let divHeight = calculateHeightOfEvent(event.startTime,event.endTime);
    let res = calculateWidthZindexMarginLeftOfEvent(event.startTime,event.endTime);
    let divWidth = res[0];
    let divZIndex = res[1];
    let divTop = calculateDivTop(event.startTime);

    const div = document.createElement('div');
    div.textContent = `${event.title} , ${event.startTime}-${event.endTime}`;
    div.style.height = `${divHeight}px`;
    div.style.width = `${divWidth}%`;
    div.style.zIndex = `${divZIndex}`;
    div.style.position = 'absolute';
    div.style.top = `${divTop}px`;
    div.style.backgroundColor = `${event.color}`;
    if(divZIndex) {
      div.style.borderWidth = '1px';
      div.style.borderColor = 'white';
      div.style.borderStyle = 'solid';
      div.style.marginLeft = `${res[2]}px`;
    } 
    div.style.borderRadius = '8px';
    border.appendChild(div);
  }
}

function loadTimeTable() {
    for(let i=startTime;i<=23;i++) {
      const div1 = document.createElement('div');
      const span = document.createElement('span');

      div1.style.position='relative';
      span.style.position='absolute';

      if(i < 12) span.innerHTML = `${i}:00 AM`;
      else if(i===12) span.innerHTML = `${i}:00 PM`;
      else span.innerHTML = `${i%12}:00 PM`;

      div1.classList.add('interval');
      span.classList.add('time-display')

      div1.appendChild(span);
      time.appendChild(div1);

      const div2 = document.createElement('div');
      div2.classList.add('interval','border-width');
      border.appendChild(div2);

      if(i===0) {
        div1.style.visibility='hidden';
        div2.style.visibility='hidden';
      }
    }
    populateTimeTable();
}
