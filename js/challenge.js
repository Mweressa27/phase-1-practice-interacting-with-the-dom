"use strict";

let playing = true;
let interval;

const counterElement = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.querySelector("form");
const likesList = document.querySelector(".likes");
const commentsList = document.querySelector(".comments");

function startTimer() {
  interval = setInterval(function () {
    const counterValue = parseInt(counterElement.innerText);
    counterElement.innerText = counterValue + 1;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function togglePause() {
  if (playing) {
    playing = false;
    stopTimer();
    pauseButton.innerText = "Resume";
  } else {
    playing = true;
    startTimer();
    pauseButton.innerText = "Pause";
  }

  document.querySelectorAll("button").forEach(button => {
    if (button.id !== "pause") {
      button.disabled = !playing;
    }
  });
}

function handleLike() {
  const counterValue = parseInt(counterElement.innerText);
  const existingLike = Array.from(likesList.children).find(item => parseInt(item.dataset.num) === counterValue);

  if (existingLike) {
    const likeCount = existingLike.querySelector("span");
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
  } else {
    const newLikeItem = document.createElement("li");
    newLikeItem.setAttribute("data-num", counterValue);
    newLikeItem.innerHTML = `${counterValue} has been liked <span>1</span> time`;
    likesList.appendChild(newLikeItem);
  }
}

function handleCommentSubmit(event) {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input");
  const commentText = commentInput.value;
  commentInput.value = "";

  const commentElement = document.createElement("p");
  commentElement.innerText = commentText;
  commentsList.appendChild(commentElement);
}

minusButton.addEventListener("click", () => {
  const counterValue = parseInt(counterElement.innerText);
  counterElement.innerText = counterValue - 1;
});

plusButton.addEventListener("click", () => {
  const counterValue = parseInt(counterElement.innerText);
  counterElement.innerText = counterValue + 1;
});

heartButton.addEventListener("click", handleLike);

pauseButton.addEventListener("click", togglePause);

commentForm.addEventListener("submit", handleCommentSubmit);

startTimer();
