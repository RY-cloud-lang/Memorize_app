// 要素を取得
const addBtn = document.getElementById("add-btn");
const startBtn = document.getElementById("start-btn");
const questionInput = document.getElementById("new-memorize-question");
const answerInput = document.getElementById("new-memorize-answer");
const memorizeList = document.getElementById("memorize-list");

// 追加ボタンを押したときの処理
addBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (question === "" || answer === "") {
    alert("質問と答えの両方を入力してください。");
    return;
  }

  
  // <li>要素を作成（1枚のカードにする）
  const li = document.createElement("li");
  li.classList.add("card"); 

  // 質問ボックスを作成
  const qBox = document.createElement("div");
  qBox.classList.add("question");
  qBox.textContent = question;

  // 答えボックスを作成
  const aBox = document.createElement("div");
  aBox.classList.add("answer");
  aBox.textContent = answer;

  // liに追加
  li.appendChild(qBox);
  li.appendChild(aBox);

  // リストに追加
  memorizeList.appendChild(li);

  // 入力欄をクリア
  questionInput.value = "";
  answerInput.value = "";
});




let cards = [];
let currentIndex = 0;

//暗記モードエリア
const studyArea = document.createElement("div")
studyArea.id = "study-area";
studyArea.style.display = "none";
document.body.appendChild(studyArea);

studyArea.innerHTML = `
  <div id="progress" style="font-size:20px; margin:10px;"></div>
  <div id="study-card" style="border:1px solid #333; padding:30px; margin:20px; font-size:24px; cursor:pointer;">
  </div>
  <button id="next-btn" style="margin:20px; padding:10px 20px;">次へ</button>
  <button id="finish-btn" style="margin:20px; padding:10px 20px;">終了</button>
`;

const finishBtn = document.getElementById("finish-btn")

function updateProgress() {
  const progress = document.getElementById("progress");
  progress.textContent = `【 ${currentIndex + 1} / ${cards.length} 】`;
}


finishBtn.addEventListener("click", () => {
  studyArea.style.display = "none";
  memorizeList.style.display = "";
  questionInput.style.display = "";   
  answerInput.style.display = "";     
  addBtn.style.display = "";   
  startBtn.style.display = "";
  
  nextBtn.disabled = false;

  currentIndex = 0;
});

const studyCard = document.getElementById("study-card");
const nextBtn = document.getElementById("next-btn");

startBtn.addEventListener("click", () => {
  cards = [];
  const items = document.querySelectorAll("#memorize-list .card");
  
  items.forEach(li => {
    const q = li.querySelector(".question").textContent;
    const a = li.querySelector(".answer").textContent;
    cards.push({ question: q, answer: a });
  });

  if (cards.length === 0) {
    alert("カードがありません。追加してください。");
    return;
  }

  currentIndex = 0;

  studyArea.style.disaplay = "block";


  // 学習モードを表示
  studyArea.style.display = "block";
  memorizeList.style.display = "none";
  questionInput.style.display = "none";
  answerInput.style.display = "none";
  addBtn.style.display = "none";
  startBtn.style.display = "none";

  // 最初のカードを質問だけ表示
  showQuestion();
});

function showQuestion() {
  const card = cards[currentIndex];
  studyCard.textContent = card.question;
  studyCard.dataset.state = "question";

  updateProgress();  
}

function showAnswer() {
  const card = cards[currentIndex];
  studyCard.textContent = card.answer;
  studyCard.dataset.state = "answer";
}

studyCard.addEventListener("click", () => {
  if (studyCard.dataset.state === "question") {
    showAnswer();
  } else {
    showQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= cards.length) {
    studyCard.textContent = "これで終了です。";
    nextBtn.disabled = true;
    return;
  }

  nextBtn.disabled = false;
  showQuestion();

});
