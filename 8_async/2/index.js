const box = document.querySelector('#box');
/* UŽDUOTIS - sukurkite savo Promise funkciją 
Duota - div'as su id box HTML'e (jau paselectinta)
1) Sukurkite funkciją delayedRotation(), kuri priims du 
parametrus - delay ir rotation (čia bus laipsniai)
2) Ši funkcija turėtų gražinti Promise objektą
3) Promise turėtų resolv'intis po paduoto delay ir pakeisti 
box divo transform parametrą į paduotus laipsnius 
4) Reject Promise dalį galite ignoruoti 
5) Pakvieskite šią funkciją naudodami ir naudodami .then 
sintaksę apsukit divą aplink savo ašį su 1s delay kas 45 
laipsnius

*/
function delayedRotation(delay, rotation) {
	return new Promise((resolve) => {
		setTimeout(() => {
			box.style.transform = `rotate(${rotation})`;
			resolve();
		}, delay);
	});
}

delayedRotation(0, '45deg')
	.then(() => {
		delayedRotation(500, '90deg');
	})
	.then(() => {
		delayedRotation(1000, '135deg');
	})
	.then(() => {
		delayedRotation(1500, '360deg');
	});
