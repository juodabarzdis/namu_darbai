/* UŽDUOTIS - pakviesti atsitiktinių žmonių API ir sugeneruoti vaizdą html'e 
iš duomenų 
1) Susikurkite kintamąjį randomPeopleAmount, kurio reikšmė turėtų būti atsitiktinis 
skaičius nuo 10 iki 40
2) Sukurkite funkciją getRandomPeople(), kuri priims vieną parametrą - skaičių 
3) Funkcijos viduje pakvieskite 
"https://randomuser.me/api/?results=(parametras_iš_funkcijos)" endpoint'ą
4) Susikurkite funkciją createCard(), kuri iš duotų duomenų sukurs html'o 
kortelės vienetą - stilių pasidarykite savo nuožiūra. 
5) getRandomPeople funkcijos viduje gavę duomenis - prasukite pro juos ciklą, 
kiekvienam žmogui sukurkite po kortelę, įdėkite ją į HTML'ą
6) Įdėkite delete mygtuką, kuris ištrins kortelę iš html'o
*/

async function randomPeopleAmount(number) {
	const resp = await fetch(`https://randomuser.me/api/?results=${number}`);
	const json = await resp.json();
	let html = '';
	// console.log(json.results);
	json.results.map(function(people) {
		console.log(people);
		html += createCard(people);
		document.getElementById('container').innerHTML = html;
	});
}

function createCard(data) {
	let html = `<div class="card">
                <img src="${data.picture.large}" alt="" />
                <h4>${data.name.first} ${data.name.second}</h4>
                <h5>${data.location.country}</h5>
                <button class="deleteBtn">delete</button>
                </div>
            `;

	return html;
}

async function delBtn() {
	// const somenum = 13;
	await randomPeopleAmount(20);

	let del = document.querySelectorAll('.deleteBtn');
	console.log(del);

	for (let delButton of del) {
		delButton.addEventListener('click', () => {
			delButton.parentElement.remove();
		});
	}
}
delBtn();
// randomPeopleAmount(5).then(function() {
// 	delBtn();
// });
// delBtn();
