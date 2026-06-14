
const words = [
{word:'面包',pinyin:'miàn bāo',emoji:'🍞',strokes:['面','包']},
{word:'饭',pinyin:'fàn',emoji:'🍚',strokes:['饭']},
{word:'面',pinyin:'miàn',emoji:'🍜',strokes:['面']},
{word:'包',pinyin:'bāo',emoji:'🥟',strokes:['包']}
];

let current = 0;
let score = 0;
let writer;
let strokeIndex = 0;

function startLearning(){

const name = document.getElementById('studentName').value;

if(name===''){
alert('请输入名字');
return;
}

document.getElementById('coverPage').classList.add('hidden');
document.getElementById('learningPage').classList.remove('hidden');

document.getElementById('displayName').innerText = name;

loadWord();

}

function loadWord(){

document.getElementById('word').innerText = words[current].word;
document.getElementById('pinyin').innerText = words[current].pinyin;
document.getElementById('emoji').innerText = words[current].emoji;

strokeIndex = 0;

createWriter();

document.getElementById('result').innerText='';

}

function createWriter(){

document.getElementById('writer').innerHTML='';

writer = HanziWriter.create('writer', words[current].strokes[strokeIndex], {

width:250,
height:250,
padding:5,
strokeAnimationSpeed:1,
delayBetweenStrokes:300,
showOutline:true,
strokeColor:'#4d6da8'

});

}

function animateStroke(){

writer.animateCharacter({

onComplete:()=>{

strokeIndex++;

if(strokeIndex < words[current].strokes.length){

createWriter();

setTimeout(()=>{
animateStroke();
},500);

}

}

});

}

function speakWord(){

const utterance = new SpeechSynthesisUtterance(words[current].word);
utterance.lang='zh-CN';
speechSynthesis.speak(utterance);

}

function playQuestion(){
speakWord();
}

function saveStudentRecord(name,score){

let records = JSON.parse(localStorage.getItem('records')) || [];

const today = new Date().toLocaleDateString();

records.push({
name:name,
score:score,
date:today
});

localStorage.setItem('records',JSON.stringify(records));

showStudentRecords();

}

function showStudentRecords(){

const historyList = document.getElementById('historyList');

if(!historyList) return;

let records = JSON.parse(localStorage.getItem('records')) || [];

historyList.innerHTML='';

records.forEach(record=>{

historyList.innerHTML += `
<div class="record">
👦 ${record.name} | 📅 ${record.date} | ⭐ ${record.score}
</div>
`;

});

}

function checkAnswer(answer){

const result=document.getElementById('result');

if(answer===words[current].word){

score+=10;

document.getElementById('score').innerText=score;

result.innerText='🎉 好棒哦！';
result.style.color='green';

const studentName = document.getElementById('displayName').innerText;

saveStudentRecord(studentName,score);

}else{

result.innerText='😅 再试试看！';
result.style.color='red';

}

}

function nextWord(){

current++;

if(current>=words.length){
current=0;
}

loadWord();

}

showStudentRecords();
