"use strict";
const metronomeInput = document.getElementById("metronome");
const bpmValue = document.getElementById("bpm");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const startBtn = document.querySelector(".start-btn");
const level = document.querySelector(".level");
const bpms = [50, 60, 70, 90, 100, 110, 140, 160, 180, 200];
const dropdown = document.getElementById("audios");
const bpm_info = document.querySelector(".bpm-info")
const infoBtn = document.querySelector(".btn-block")
let currentIndex = 0;



startBtn.disabled = true;

dropdown.addEventListener("change",function() {
  if(dropdown.value) {
    startBtn.disabled = false;
  }else{
    startBtn.disabled = true;
  }
})

//if range input changes -> find the closest value in array(bpms)
metronomeInput.addEventListener("input", function () {
  bpmValue.innerText = Number(metronomeInput.value);
  updateButtonStates();
  defineLevel();
});

function defineLevel() {
  const val = Number(bpmValue.innerText);
  if (val < 90) level.innerText = "Easy 🎉";
  else if (val < 140 && val >= 90) level.innerText = "Mid 🍃";
  else level.innerText = "Hard🔥";
}

function updateButtonStates() {
  const val = Number(bpmValue.innerText);
  if (val >= bpms[bpms.length - 1]) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  if (val <= bpms[0]) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
}

// Next Button
nextBtn.addEventListener("click", function () {
  const val = Number(bpmValue.innerText);
  for (let i = 0; i < bpms.length; i++) {
    if (bpms[i] > val) {
      currentIndex = i - 1;
      break;
    }
  }
  bpmValue.innerText = bpms[currentIndex + 1];
  metronomeInput.value = bpms[currentIndex + 1];
  updateButtonStates();
  defineLevel();
});

// Prev Button
prevBtn.addEventListener("click", function () {
  const val = Number(bpmValue.innerText);
  for (let i = bpms.length - 1; i >= 0; i--) {
    if (bpms[i] < val) {
      currentIndex = i;
      break;
    }
  }
  bpmValue.innerText = bpms[currentIndex];
  metronomeInput.value = bpms[currentIndex];
  updateButtonStates();
  defineLevel();
});

let isPlaying = false;
function play() {
  if (!isPlaying) return;

  if (dropdown.value == null) {
    startBtn.disabled = true;
  }
  const metronomeAudio = dropdown.value;
  const click = new Audio(metronomeAudio);
  click.play();
  const val = parseInt(bpmValue.innerText);
  console.log(val);
  const intervalTime = (60 / val) * 1000;
  setTimeout(play, intervalTime);
}

startBtn.addEventListener("click", function () {
  isPlaying = !isPlaying;
  if (isPlaying) {
    startBtn.innerText = "Stop";
    play(); // start metronome
  } else {
    startBtn.innerText = "Start";
  }
});


infoBtn.addEventListener("click", function() {
  bpm_info.classList.toggle("hide")
  if(bpm_info.classList.contains("hide")){
    infoBtn.textContent = "Show bpm info"
  }else{
    infoBtn.textContent = "Hide bpm info"
    
  }
  
})

