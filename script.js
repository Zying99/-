const words = [
{word:'面包',pinyin:'miàn bāo',emoji:'🍞'},
{word:'饭',pinyin:'fàn',emoji:'🍚'},
{word:'面',pinyin:'miàn',emoji:'🍜'},
{word:'包',pinyin:'bāo',emoji:'👜'}
];

let current = 0;
let score = 0;

function loadWord(){
document.getElementById('word').innerText = words[current].word;
document.getElementById('pinyin').innerText = words[current].pinyin;
document.getElementById('emoji').innerText = words[current].emoji;
document.getElementById('stroke').innerText = words[current].word;
document.getElementById('result').innerText = '';
}

function speakWord(){
const utterance = new SpeechSynthesisUtterance(words[current].word);
utterance.lang = 'zh-CN';
speechSynthesis.speak(utterance);
}

function playQuestion(){
speakWord();
}

function checkAnswer(answer){
const result = document.getElementById('result');

if(answer === words[current].word){
score += 10;
document.getElementById('score').innerText = score;
result.innerText = '🎉 好棒哦！答对了！';
result.style.color = 'green';
}else{
result.innerText = '😅 再试试看！';
result.style.color = 'red';
}
}

function nextWord(){
current++;
if(current >= words.length){
current = 0;
}
loadWord();
}

loadWord();
