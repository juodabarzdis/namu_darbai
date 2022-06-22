const form = document.querySelector('#submit-highscore');
const usernameInput = document.querySelector('#username');
const currentHighscores = JSON.parse(localStorage.getItem('highscores')) || [];

console.log(currentHighscores);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const score = +document.querySelector('.final-score').innerText;
	const result = {
		name: usernameInput.value,
		score: score
	};
	const newHighscores = [ ...currentHighscores, result ];
	localStorage.setItem('highscores', JSON.stringify(newHighscores));
	// console.log(usernameInput.value);
	// console.log(score);
});
