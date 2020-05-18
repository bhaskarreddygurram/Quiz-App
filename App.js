const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answerIndicatorContainer = document.querySelector('.answer-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the question into available question array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion; i++)
    {
        availableQuestions.push(quiz[i]);
    }
}
//get question number and question and options
function getNewQuestion (){
// set question number
    questionNumber.innerHTML = 'Question ' + (questionCounter+1) + ' of ' + quiz.length;
//set Question
//get Random Question
const questionIndex = availableQuestions[Math.floor(Math.random() *availableQuestions.length)];
currentQuestion = questionIndex;
questionText.innerHTML = currentQuestion.q;
// get the postion of question index from availble question Array
const index1 = availableQuestions.indexOf(questionIndex);
//reomove the question index form the available question array
availableQuestions.splice(index1,1);
// set options
//get the length of options
const optionLen = currentQuestion.option.length;
for(let i=0;i<optionLen; i++){
    availableOptions.push(i);
}
optionContainer.innerHTML= '';
let animationDelay = 0.2;

//create option in html
for (let i=0;i<optionLen; i++){
    //random question
    const optionIndex  = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 =availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2,1);
    const option =document.createElement('div');
    option.innerHTML= currentQuestion.option[optionIndex];
    option.id= optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.2 ;
    option.className='option';
    optionContainer.appendChild(option);
    option.setAttribute('onclick', 'getResult(this)');

}
questionCounter++;
}
//get the result of current attempt question

function getResult (element){
const id = parseInt(element.id);

if (id===currentQuestion.answer){
    //set the green color to answer
    element.classList.add('correct');

    // add the indicator to correct mark
    updateAnswerIndicator('correct');
    correctAnswers++;
}
else{
    //set the red color to wrong answers
    element.classList.add('wrong');

    // add the indicator to wrong mark
    updateAnswerIndicator('wrong');
    
    //if the answer is incorrect then show the correct answer by adding green color aumatically
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
       if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer) {
        optionContainer.children[i].classList.add('correct');
       } 
    }
}
attempt++;
unclickableOptions();
}

//make all the options unclickable once the user select the one option
function unclickableOptions(){
const optionLen = optionContainer.children.length;
for(let i=0; i<optionLen; i++){
    optionContainer.children[i].classList.add('already-answered');
}
}
function answersIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement('div');
        answerIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}
function next(){
 if(questionCounter === quiz.length){
     quizOver();
 }   
 else{
     getNewQuestion();
 }
}
function quizOver(){
//hide quiz box
quizBox.classList.add('hide');
//show result Box
resultBox.classList.remove('hide');
quizResult();
}
//get the Result
function quizResult (){
    resultBox.querySelector('.total-question').innerHTML=quiz.length;
    resultBox.querySelector('.total-attempt').innerHTML=attempt;
    resultBox.querySelector('.total-correct').innerHTML= correctAnswers;
    resultBox.querySelector('.total-wrong').innerHTML=attempt- correctAnswers;
    const precentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector('.percentage').innerHTML=precentage.toFixed(2) + '%';
    resultBox.querySelector('.total-score').innerHTML= correctAnswers + ' / ' + quiz.length;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}
function tryAgainQuiz(){
    //hide the result box
    resultBox.classList.add('hide');
    //show the quixbox
    quizBox.classList.remove('hide');
    resetQuiz();
    startQuiz();
}
function goToHome(){
    //hide the result Box
    resultBox.classList.add('hide');
    //show the home box
    homeBox.classList.remove('hide');
    resetQuiz();
}
 function startQuiz(){
    //hide home box
    homeBox.classList.add('hide');
    //show quizbox
    quizBox.classList.remove('hide');

    //first we will set all questions in available questions Array
    setAvailableQuestions();
    //second we will call getNewQuestion() function
    getNewQuestion ();
    //to create indicator of Answers
    answersIndicator();
}
window.onload = function (){
    homeBox.querySelector('.total-question').innerHTML = quiz.length;
}