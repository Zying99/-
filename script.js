const words = [

{
  word:'面包',
  pinyin:'miàn bāo',
  emoji:'🍞',
  stroke:'面'
},

{
  word:'饭',
  pinyin:'fàn',
  emoji:'🍚',
  stroke:'饭'
},

{
  word:'面',
  pinyin:'miàn',
  emoji:'🍜',
  stroke:'面'
},

{
  word:'包',
  pinyin:'bāo',
  emoji:'👜',
  stroke:'包'
}

];

let current = 0;
let score = 0;
let writer;

function loadWord(){

  document.getElementById('word').innerText = words[current].word;

  document.getElementById('pinyin').innerText = words[current].pinyin;

  document.getElementById('emoji').innerText = words[current].emoji;

  createWriter();

  document.getElementById('result').innerText='';

}

function createWriter(){

  document.getElementById('writer').innerHTML='';

  writer = HanziWriter.create('writer', words[current].stroke, {

    width:250,
    height:250,
    padding:5,
    strokeAnimationSpeed:1,
    delayBetweenStrokes:300,

    showOutline:true,
    strokeColor:'#4c94d6'

  });

}

function animateStroke(){

  writer.animateCharacter();

}

function speakWord(){

  const utterance = new SpeechSynthesisUtterance(words[current].word);

  utterance.lang='zh-CN';

  speechSynthesis.speak(utterance);

}

function playQuestion(){

  speakWord();

}

function checkAnswer(answer){

  const result=document.getElementById('result');

  if(answer===words[current].word){

    score+=10;

    document.getElementById('score').innerText=score;

    result.innerText='🎉 好棒哦！';

    result.style.color='green';

  }

  else{

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

loadWord();
