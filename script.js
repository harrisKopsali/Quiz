const fact = [
    {
        statement: `In JavaScript, the "===" operator checks for strict equality.`,
        answer: true,
        explanation: `The "===" operator in JavaScript checks for both value and 
                type equality. It does not perform type coercion, so the values 
                on both sides must be of the same type and have the same value.`
    },
    {
        statement: `The "let" keyword is used to declare variables with block scope.`,
        answer: true,
        explanation: `The "let" keyword is used to declare variables in JavaScript 
                with block scope, meaning the variable is only accessible within the 
                block (e.g., inside a loop or if statement) where it is defined.`
    },
    {
        statement: `The "prototype" property in JavaScript is used for inheritance between objects.`,
        answer: false,
        explanation: `The "prototype" property in JavaScript is indeed used for inheritance 
                between objects. It is a key concept in the prototype-based inheritance model of JavaScript. `
    },
    {
        statement: `JavaScript is a statically-typed language.`,
        answer: false,
        explanation: `JavaScript is a dynamically-typed language, as variable types 
                are determined at runtime. This means that a variable can hold values 
                of any type, and its type can change during the execution of the program.`
    },
    {
        statement: `Arrow functions in JavaScript do not have their own "this" context.`,
        answer: true,
        explanation: `Arrow functions do not have their own "this" context; they inherit 
                the "this" value from the enclosing scope in which they were created. 
                This is different from regular functions, which have their own "this" context.`
    },
    {
        statement: `The "async/await" syntax in JavaScript is used to work with asynchronous code in a more synchronous way.`,
        answer: false,
        explanation: `The "async/await" syntax in JavaScript is indeed used to work with asynchronous code in a more 
                synchronous way. It allows you to write asynchronous code that looks and behaves more like synchronous code, 
                making it easier to understand.`
    },
    {
        statement: `The "localStorage" object in JavaScript allows you to store data 
                that persists even after the browser is closed.`,
        answer: true,
        explanation: `The "localStorage" object in JavaScript allows you to store 
                key-value pairs in a web browser with no expiration time. The data 
                persists even after the browser is closed and reopened.`
    },
    {
        statement: `The "JSON.parse()" function is used to convert a JSON 
                string into a JavaScript object.`,
        answer: false,
        explanation: `The "JSON.parse()" function is indeed used to parse a 
                JSON string and convert it into a JavaScript object.`
    },
    {
        statement: `JavaScript is a single-threaded language, meaning it can execute 
                only one operation at a time.`,
        answer: true,
        explanation: `JavaScript is single-threaded and uses an event-driven, 
                non-blocking model. This means that it can handle multiple tasks 
                concurrently, but it processes one task at a time from the event queue.`
    },
    {
        statement: `The "map" function in JavaScript is used to iterate over the elements of an array and transform them.`,
        answer: true,
        explanation: `The "map" function in JavaScript is used to iterate over each element of an array and apply 
                a callback function to transform each element, creating a new array with the transformed values.`
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