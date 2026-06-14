let score = 0;

function checkAnswer(answer) {
  const result = document.getElementById("result");

  if(answer === "苹果") {
    score += 10;
    result.innerHTML = "🎉 好棒哦！答对了！";
    result.style.color = "green";
  } else {
    result.innerHTML = "😅 再试试看哦！";
    result.style.color = "red";
  }

  document.getElementById("score").innerText = score;
}

function speakWord() {
  const utterance = new SpeechSynthesisUtterance("苹果");
  utterance.lang = "zh-CN";
  speechSynthesis.speak(utterance);
}
