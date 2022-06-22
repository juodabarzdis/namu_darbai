/* UŽDUOTIS - panaudokite fetch api 
1) Sukurkite funkciją getRandomCatFact()
2) Funkcijos viduje pakvieskite "https://catfact.ninja/fact" endpoint'ą 
3) Iš response išsitrauktie atsitiktinį faktą apie katę
4) HTML'e susikurkite mygtuką - jį paspaudus į h1 turėtų įsidėti atsitiktinis 
faktas

*/

let button = document.querySelector('button');
let h1 = document.querySelector('h1');

async function getRandomCatFact() {
	button.addEventListener('click', async function() {
		const response = await fetch('https://catfact.ninja/fact');
		const json = await response.json();
		h1.textContent = json.fact;
	});
}

getRandomCatFact();
