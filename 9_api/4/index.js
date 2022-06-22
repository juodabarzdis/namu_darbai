/* UŽDUOTIS - sukurti viktorinos žaidimą naudojant web API 
https://opentdb.com/api_config.php - api dokumentacija
Šio API dėka galite gauti atsitikinius klausimus.
Padarykite aplikaciją, kur klausimai bus tik true/false 
(skaitykite dokumentaciją, galime duoti tam tikrą parametrą, kuris gražins tik 
true/false tipo klausimus)
pavyzdys - https://quizz-game-react.netlify.app/game (tik čia ne true/false)
** Padaryti highscores naudojant localstorage 

*/

// const game = document.querySelector('.game');
const startBtn = document.querySelector('#start');
const gameWindow = document.querySelector('#game-window');
const startWindow = document.querySelector('#start-window');
const questionDisplay = document.querySelector('#question');
const trueBtn = document.querySelector('#true');
const falseBtn = document.querySelector('#false');
const scoreDisplay = document.querySelector('.score');
const loader = document.querySelector('.loader-container');
const isCorrectHeader = document.querySelector('.is-correct-h2');
const gameOver = document.querySelector('.game-over');
const finalScore = document.querySelector('.final-score');
const currentQuestion = document.querySelector('.current-question');
const DELAY_BETWEEN_QUESTIONS = 0;

let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let page = 1;

async function getQuestions() {
	loader.classList.remove('d-none');
	const resp = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean');
	const json = await resp.json();
	loader.classList.add('d-none');
	const formatedQuestions = formatQuestions(json.results);
	gameWindow.classList.remove('d-none');
	startGame(formatedQuestions);
	// console.log(formatedQuestions);
}

function formatQuestions(questions) {
	return questions.map((question) => {
		return { question: question.question, isTrue: question.correct_answer === 'True' };
	});
}

function startGame(formatedQuestions) {
	score = 0;
	currentQuestionIndex = 0;
	page = 1;
	currentQuestion.innerText = page;
	scoreDisplay.innerText = 'Score: 0';
	gameOver.classList.add('d-none');
	questions = [ ...formatedQuestions ];
	console.log(questions);
	questionDisplay.innerHTML = questions[currentQuestionIndex].question;
}

startBtn.addEventListener('click', () => {
	getQuestions();
	startWindow.classList.add('d-none');
	isCorrectHeader.classList.add('d-none');
	gameOver.classList.add('d-none');
});

trueBtn.addEventListener('click', () => {
	if (questions[currentQuestionIndex].isTrue) {
		score++;
		isCorrectHeader.innerText = 'Correct!';
		isCorrectHeader.style.color = 'green';
	} else {
		isCorrectHeader.innerText = 'Wrong!';
		isCorrectHeader.style.color = 'red';
	}
	page++;
	currentQuestion.innerText = page;
	scoreDisplay.innerText = `Score: ${score}`;

	questionDisplay.innerHTML = questions[currentQuestionIndex].question;
	isCorrectHeader.classList.remove('d-none');

	if (currentQuestionIndex === questions.length - 1) {
		return handleGameOver();
	}
	currentQuestionIndex++;

	setTimeout(() => {
		loader.classList.add('d-none');
		gameWindow.classList.remove('d-none');
	}, DELAY_BETWEEN_QUESTIONS);
	gameWindow.classList.add('d-none');
	loader.classList.remove('d-none');
});

function handleGameOver() {
	gameOver.classList.remove('d-none');
	gameWindow.classList.add('d-none');
	finalScore.innerText = score;
	startWindow.classList.remove('d-none');
	startBtn.innerHTML = 'Play again';
}

falseBtn.addEventListener('click', () => {
	if (!questions[currentQuestionIndex].isTrue) {
		score++;
		isCorrectHeader.innerText = 'Correct!';
		isCorrectHeader.style.color = 'green';
	} else {
		isCorrectHeader.innerText = 'Wrong!';
		isCorrectHeader.style.color = 'red';
	}
	page++;
	currentQuestion.innerText = page;
	scoreDisplay.innerText = `Score: ${score}`;

	questionDisplay.innerHTML = questions[currentQuestionIndex].question;
	isCorrectHeader.classList.remove('d-none');

	if (currentQuestionIndex === questions.length - 1) {
		return handleGameOver();
	}

	currentQuestionIndex++;
	setTimeout(() => {
		loader.classList.add('d-none');
		gameWindow.classList.remove('d-none');
	}, DELAY_BETWEEN_QUESTIONS);
	gameWindow.classList.add('d-none');
	loader.classList.remove('d-none');
});
