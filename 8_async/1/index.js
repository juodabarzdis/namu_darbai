/* UŽDUOTIS - panaudokite .then promise sintaksę
DUOTA - funkcija fakeRequest, kuri priima kaip parametrą 
url ir gražina Promise objektą. Math.random dėka kartais 
gražins sėkmingą funkcija, kartais ne.

Jums reikia - pakviesti fakeRequest funkcija su url's : 
www.dogs.com/page1
www.dogs.com/page2
www.dogs.com/page3
iš eilės vieną po kito. Naudokite .then sintaksę ir kiekvienos jos viduje 
gražinkite naują Promise objektą su sekančiu url ir išspausdinkite konsolėje 
resolvintą reikšmę 
.catch dalyje išspausdinkite errorą į consolę(.catch turėtų būti tik vienas).
*/

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		const delay = Math.floor(Math.random() * 4500) + 500;
		setTimeout(() => {
			if (delay > 4000) {
				reject('Connection Timeout :(');
			} else {
				resolve(`Here is your fake data from ${url}`);
			}
		}, delay);
	});
};

// console.log(fakeRequest());

// // KODAS Prasideda čia

console.log(
	fakeRequest('http://www.dogs.com/page1')
		.then(() => {
			console.log('it worked page 1');
		})
		.then(() => {
			console.log(fakeRequest('http://www.dogs.com/page2'));
			console.log('it worked page 2');
		})
		.then(() => {
			console.log(fakeRequest('http://www.dogs.com/page3'));
			console.log('it worked page 3');
		})
		.catch((error) => {
			console.log('error');
		})
);

// BAIGIASIA ČIA
