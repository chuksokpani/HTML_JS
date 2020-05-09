const question = document.querySelector(".question");
const A =document.querySelector(".option1");
const B =document.querySelector(".option2");
const C =document.querySelector(".option3");
const D =document.querySelector(".option4");
const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker")
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
let questionIndex=0;
let index=0;
let myArray=[];
let myArr=[];
let score=0;


const questions= [
    {
        q:"Which of these movies was NOT directed by Christopher Nolan",
        options:["Shutter Island","The Prestige", "Inception", "The Dark Knight"],
        answer:0
    },
    
    {
        q:"Which of these diseases is NOT caused by a virus?",
        options:["Yellow Fever","Polio", "Cholera", "COVID-19"],
        answer:2
    },
    {
        q:"The sequence, 1, 1, 2, 3, 5, 8, 13... is known as the?",
        options:["Triangular Number Sequence", "Fibonacci sequence ", "Catalan Number Sequence", "Magic Square Sequence"],
        answer:1
    },
    {
        q:"Which of these Nigerian artistes has won a Grammy Award?",
        options:["BurnaBoy","Sade Adu", "9Ice", "2Baba"],
        answer:1
    },
    {
        q:"Which of these is the oldest University in Nigeria",
        options:["University of Ibadan","University of Lagos", "University of Nigeria, Nsukka", "Ahmadu Bello University, Zaria"],
        answer:0
    },
]

totalQuestionSpan.innerHTML=questions.length;
function load(){
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questions[questionIndex].q;
    A.innerHTML=questions[questionIndex].options[0];
    B.innerHTML=questions[questionIndex].options[1];
    C.innerHTML=questions[questionIndex].options[2];
    D.innerHTML=questions[questionIndex].options[3];
    index++;

}
function check(element){
    if(element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions()
}

function disabledOptions(){
    for(let i=0;i<options.length;i++){
        options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");

        }
    }
}
function enableOptions(){
    for(let i=0;i<options.length;i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}
function validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select an option to proceed")
    }
    else{
        enableOptions();
        randomQuestion();
    }
}
function next(){
    validate();
}
function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
    if(index==questions.length){
        quizOver();
    }
    else{
        if(myArray.length>0){
            for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    hitDuplicate=1;
                    break;
                }
            }
            if (hitDuplicate==1){
                randomQuestion();
            }
            else{
                questionIndex=randomNumber;
                load();
                myArr.push(questionIndex);
            }

        }
        if (myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);

        }
        myArray.push(randomNumber)
    }   
}

function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);

}

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}
function playAgain(){
    window.location.reload();

}
window.onload=function(){
    randomQuestion();
    answerTracker();
}