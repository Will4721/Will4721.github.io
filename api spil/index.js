const api_spørgsmål = "https://opentdb.com/api.php?amount=40";
let spørgsmålData = null; 
let currentIndex = 0;
let showAnswer = false;
let shuffledChoices = []; // Stores shuffled answers for multiple choice
let dennisindex = 0;
let stineindex = 0;
let rasmusindex = 0;
let williamindex = 0;





async function setup() {
  createCanvas(1920, 911);
  spørgsmålData = await getData();
   
  let minus1Btn = createButton("-");
  minus1Btn.position(width/3 - 35 , 800);
  minus1Btn.mousePressed(() => dennisindex = Math.max(0, dennisindex - 1));

  let plus1Btn = createButton("+");
  plus1Btn.position(width/3 , 800);
  plus1Btn.mousePressed(() => dennisindex++);

  let minus2Btn = createButton("-");
  minus2Btn.position(width/3 + 120, 800);
  minus2Btn.mousePressed(() => stineindex = Math.max(0, stineindex - 1));

  let plus2Btn = createButton("+");
  plus2Btn.position(width/3 + 150, 800);
  plus2Btn.mousePressed(() => stineindex++);

  let minus3Btn = createButton("-");
  minus3Btn.position(width/3 + 370, 800);
  minus3Btn.mousePressed(() => rasmusindex = Math.max(0, rasmusindex - 1));

  let plus3Btn = createButton("+");
  plus3Btn.position(width/3 + 410, 800);
  plus3Btn.mousePressed(() => rasmusindex++);

  let minus4Btn = createButton("-");
  minus4Btn.position(width/3 + 510, 800);
  minus4Btn.mousePressed(() => williamindex = Math.max(0, williamindex - 1));

  let plus4Btn = createButton("+");
  plus4Btn.position(width/3 + 550, 800);
  plus4Btn.mousePressed(() =>  williamindex++);



  // Create "Reveal Answer" button
  let revealBtn = createButton("Reveal Answer");
  revealBtn.position(width/3 + 100, 700);
  revealBtn.mousePressed(() => showAnswer = true);

  // Create "Next Question" button
  let nextBtn = createButton("Next" + " Question");
  nextBtn.position(width/2, 700);
  nextBtn.mousePressed(nextQuestion);

  if (spørgsmålData) shuffleAnswers(); // Shuffle the first question
}

function draw() {
  background('#C6FCFF');
  textSize(16);
  textAlign(CENTER);
  
  
  fill(255,0,0);
  rect(width/3 - 50 , 750, 100, 100, 100);
  fill(0);
  text(dennisindex, width/3 , 775);
  fill(0,255,0);
  rect(width/2 + 35, 750, 100, 100, 100);
  fill(0);
  text(rasmusindex, width/3 + 405 , 775);
  fill(0,0,255);
  rect(width/2 + 175, 750, 100, 100, 100);
  fill(0);
  text(williamindex, width/3 + 545 , 775);
  fill(50,100,100);
  rect(width/3 + 100 , 750, 100, 100, 100);
  fill(0);
  text(stineindex, width/3 + 150 , 775);
  fill(0);

  text ("Dennis", width/3, 900);
  text ("Stine", width/3 + 150, 900);
  text ("Rasmus", width/3 + 405, 900);
  text ("William", width/3 + 545, 900);


  if (!spørgsmålData || !spørgsmålData.results?.length) {
    text("Henter spørgsmål...", width / 2, height / 2);
    return;
  }

  let questionObj = spørgsmålData.results[currentIndex];
  let spørgsmål = questionObj.question;
  let kategori = questionObj.category;
  let sværhedsgrad = questionObj.difficulty;
  let svar = questionObj.correct_answer;
  let type = questionObj.type;

  text("Kategori: " + kategori, width / 2, height / 2 - 60);
  text("Type: " + (type === "boolean" ? "True / False" : "Multiple Choice"), width / 2, height / 2 - 40);
  text("Spørgsmål: " + spørgsmål, width / 2, height / 2);
  text("Sværhedsgrad: " + sværhedsgrad, width / 2, height / 2 + 20);

  if (type === "multiple") {
    for (let i = 0; i < shuffledChoices.length; i++) {
      text((i + 1) + ". " + shuffledChoices[i], width / 2, height / 2 + 40 + (i * 20));
    }
  }

  if (showAnswer) {
    fill(255, 0, 0);
    text("Svar: " + svar, width / 2, height / 2 + 120);
  }

  
}

async function getData() {
  try {
    const response = await fetch(api_spørgsmål);
    const data = await response.json();
    return data.results ? data : null;
  } catch {
    return null;
  }
}

function shuffleAnswers() {
  let questionObj = spørgsmålData.results[currentIndex];
  if (questionObj.type === "multiple") {
    shuffledChoices = [...questionObj.incorrect_answers, questionObj.correct_answer];
    shuffledChoices.sort(() => Math.random() - 0.5); // Shuffle once
  } else {
    shuffledChoices = [];
  }
}

function nextQuestion() {
  showAnswer = false;
  currentIndex = (currentIndex + 1) % spørgsmålData.results.length; // Loop through questions
  shuffleAnswers(); // Shuffle new answers only when switching questions
}



