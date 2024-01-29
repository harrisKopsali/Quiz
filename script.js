const fact = [
    {
        statement: `JavaScript was invented in 1995`,
        answer: true,
        explanation: `Brendan Eich created JS at Netscape 
            in 1995. The initial version of the language was written in just 10 days.`
    },
    {
        statement: `Strings in JS are editable values`,
        answer: false,
        explanation: ` In JavaScript strings are immutable values,meaning they 
            cannot be edited; however, they can replaced with new, different strings.`
    },
    {
        statement: `1 + 1 === 2`,
        answer: true,
        explanation: `The plus operator gives the sum of two numbers.`
    },
    {
        statement: `'1' + '1' === '2'`,
        answer: false,
        explanation: `The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.`
    },
    {
        statement: `typeof ['J', 'S'] === 'array'`,
        answer: false,
        explanation: `Arrays have the type 'object'. In JS, everything is either a 
            primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind 
            of object with some special properties.`
    }
];

const score = document.getElementById('score');
const statement = document.getElementById('statement');
const optionButtons = document.getElementById('options').children;
const explanation = document.getElementById('explanation');
const nextQuestion = document.getElementById('nextQuestion');
const disable = (button) => button.setAttribute('disabled', '');
const enable = (button) => button.removeAttribute('disabled');
const hide = (el) => el.setAttribute('hidden', '');
const show = (el) => el.removeAttribute('hidden');
let question;
let correctAns = 0;
let completedQues = 0;


function getNextQuestion() {
    question = fact.shift();    // pull each object everytime somewhere this function is called
    statement.innerHTML = question.statement;
    hide(explanation);
    
    for (let anotherButton of optionButtons) {  // resetting buttons to their initial state
        anotherButton.classList.remove("correct");
        anotherButton.classList.remove("incorrect");
        enable(anotherButton);
    }
    disable(nextQuestion);

}

score.innerHTML = `Score: ${correctAns}/${completedQues}`;
getNextQuestion();

function isCorrect(guess) {     // checking answers if they are correct
    return ( guess === question.answer.toString() );
}

for (let button of optionButtons) {
    button.addEventListener('click', (event) => {   // show the answer
        for (let otherButton of optionButtons) {
            disable(otherButton);
        }

        if(fact.length > 0){
            enable(nextQuestion);
        } else {
            nextQuestion.innerHTML= 'No more questions!';
        }

        if (isCorrect(event.target.value)) {
            event.target.classList.add('correct');
            correctAns++ ;
        } else {
            event.target.classList.add('incorrect');
        }

        show(explanation);
        explanation.innerHTML = question.explanation;
        completedQues++ ;
        score.innerHTML = `Score: ${correctAns}/${completedQues}`;
    });
}

nextQuestion.addEventListener('click', getNextQuestion);