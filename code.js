n// Implementation of Emoji in a simple Java Script version of Jeopardy
 // Imolement g API adquirimg the the Quedtion and Anwers for the Aplicación 

let cluesArray = [];
let questionNumber = 0;
let score = 0
let exhaustButton = document.getElementById("exhaust-btn");
let exhaustButtonH = document.getElementById("exhaustH-btn");
let questionAnswer = document.getElementById("questionAnswer");
let answerInput = document.getElementById("userAnswer");
let resetBtnAnswer = document.getElementById("reset");
let scoreMark = document.getElementById("scoreMark");
let answerCheck = document.getElementById("checkAnswer");
let questionText = document.getElementById("question");
let matchContainer = document.querySelector('.container');
let greeted = document.getElementById("Jeopardy" );
let startingMinutes = 10;
let time = startingMinutes *60;
let countDownEl = document.getElementById("counterDown")
let started = false;
let interval = null

exhaustButton.addEventListener("click", startGame)
exhaustButtonH.addEventListener("click", startGame)
function getData(){
    fetch('https://jservice.kenzie.academy/api/random-clue?valid=true')
    .then(response => response.json())
    .then(data => data.categoryId)
    .then(categoryId => {

    fetch(`https://jservice.kenzie.academy/api/clues?category=${categoryId}`)
    .then(response => response.json())
    .then(data => {
            cluesArray = data.clues
            index = Math.floor((Math.random() * cluesArray.length - 1) + 1) 
            currentClue = cluesArray.splice(index, 1)[0]
            renderQuestion(currentClue)
            return currentClue
        })

 function renderQuestion(jeopardy) {
        console.log("Correct Answer:", jeopardy.answer)
           document.getElementById('question').innerHTML = jeopardy.question
           document.getElementById('category').innerHTML = jeopardy.category.title
           
        }
    })
}


resetBtnAnswer.addEventListener("click", function(event) {

    event.preventDefault();
    let userAnswer = answerInput.value;
    matchContainer.style.background = "red";
    if (userAnswer === "") {
        answerCheck.innerHTML = "";
          setTimeout(function removeMessage() {
        answerCheck.innerHTML = "ANSWER ME ANSWER ME ANSWER ME ANSWER ANSWER ME ANSWER ME ANS"; 
    }, 4000) 

    } else if (userAnswer === answerInput.value) {
        score += 1;
        scoreMark.innerHTML = " 🥇" + score; 
        answerInput.value = "";
        matchContainer.style.background = "Black";
        answerCheck.innerHTML = " 5️⃣0️⃣0️⃣ ";
    } 

    else {

        endGame()
        
    }

    if (score === 5) {
        console.log("Game Over !")
        scoreMark.innerHTML = "";
        questionText.innerHTML = "";
        matchContainer.style.background = "Black";
        exhaustButton.innerText = "💢🔟0️⃣0️⃣0️⃣";
        exhaustButtonH.innerText = "💢 5️⃣0️⃣0️⃣0️⃣";
        resetBtnAnswer.style.display = "none";
        answerInput.style.display = "none"
        answerCheck.innerHTML = "🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮"+
         "🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🎮 🆗 ❌ 🎮 🆗 ❌ " 
        + score;
        category ="";
        score = 0;
    }
    
})

function timer(){

    let minutes = Math.floor(time/60);
    let seconds = time% 60;
    seconds = seconds< 10? "0" + seconds: seconds;
    countDownEl .innerHTML = "" + " " +  `${minutes}: ${seconds}`;
   time--;
    if (time==0){
        clearInterval (interval)
        started =false;
        countDownEl .innerHTML = "TIME OUT" 
        time;
   endGame()
   if (score === 5) {
    console.log("Game Over !")
    scoreMark.innerHTML = "";
    questionText.innerHTML = "";
    matchContainer.style.background = "Black";
    exhaustButton.innerText = "💢🔟0️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = " 💢5️⃣0️⃣0️⃣0️⃣";
    resetBtnAnswer.style.display = "none";
    answerInput.style.display = "none"
    answerCheck.innerHTML = "🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕"+
    " ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ "  
     + score;
    score = 0;
    
}

    }
 }

function startGame() {

    if(!started){

    if(time >= 0){
     interval= setInterval(timer, 1000); 
        started = true;
        time;
    }

    else{
        clearInterval (interval)
         started =false;
        countDownEl .innerHTML = "TIME OUT" 
   endGame()
    console.log("Game Over !")
    scoreMark.innerHTML = "";
    questionText.innerHTML = "";
    matchContainer.style.background = "Black";
    exhaustButton.innerText = "💢🔟0️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = "💢 5️⃣0️⃣0️⃣0️⃣";
    resetBtnAnswer.style.display = "none";
    answerInput.style.display = "none"   
    answerCheck.innerHTML = " 🆗 ❌ 🆕 🎮 🆗 ❌  🆕 🎮 🆗 ❌ 🆕 🎮 🆗  ❌  🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌  🆗  ❌  🆕 🎮 🆗   ❌  🆕 🎮 🆗 ❌ 🆕 🎮 🆗" + 
    "❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗 ❌ 🆕 🎮 🆗  ❌  🆕 🎮 🆗  ❌ 🆕 🎮 🆗 ❌ 🎮 "
    + score;
    score = 0;
    }
}

getData();
    exhaustButton.innerText = "💢 🔟0️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = "💢  5️⃣0️⃣0️⃣0️⃣";
    answerCheck.innerHTML = "";
    resetBtnAnswer.style.display = "block";
    answerInput.style.display = "block";
    greeted.style.display = "none";
}

function displayBtn() {
    resetBtnAnswer.style.display = "none";
    answerInput.style.display = "none";
    greeted.innerHTML = "❗JEOPARDY ";
}
displayBtn();

function endGame(){

        score = 0;
        exhaustButton.innerText = "💢 RESTARTREST";
        exhaustButtonH.innerText = "💢 RESTARTREST";
        answerInput.value = "";
        questionText.innerHTML = "";
        matchContainer.style.background ="Black";
        scoreMark.innerHTML = " 🥇" + score;
        answerCheck.innerHTML = "ANSWER ME ANSWER ME ANSWER ME ANSWER ME ANSWER ME ANSWER ME ANS";
        setTimeout(function removeMessage() {
        answerCheck.innerHTML = " ";
        }, 2000)

}

