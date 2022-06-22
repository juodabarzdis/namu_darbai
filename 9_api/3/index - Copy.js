/* UŽDUOTIS - sukurkite aplikaciją su TV maze API 
1) Padarykite paieškos lauką, kuris submitinus paims value iš inputo 
ir gražins naujus duomenis 
2) Susiraskite internete kažkokių dizaino elementų ir padarykite gražią aplikaciją
 Pavyzdys https://moviedb-api-react.netlify.app/ - home puslapis 

https://www.tvmaze.com/api - skaitykite API dokumentaciją 

*/

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const myModalContent = document.querySelector('.my-modal-content');
const myModal = document.querySelector('.my-modal');
const exit = document.querySelector('.exit');

async function getShows(query) {
	const resp = await fetch(` https://api.tvmaze.com/search/shows?q=${query}`);
	const json = await resp.json();
	let html = '';
	// console.log(json);
	// console.log(data.show.externals);
	json.map(function(allShows) {
		html += show(allShows);
		document.getElementById('container').innerHTML = html;
	});
}

function show(data) {
	let html = `
            <div class="card">
            <a href="#" id="${data.show.externals.imdb}" onclick="about(${data.show.externals.imdb})"><img src="${data
		.show.image.medium}" alt=""/></a>
            <h3>${data.show.name}</h3>
            </div>
            `;

	// console.log(data.show.externals.imdb);
	// console.log(data.show.externals.thetvdb);
	return html;
}

function showData(aboutShow) {
	let html = `
                <div class="show-info">
                <div class="modal-left-side">
                	<img src="${aboutShow.image.medium}" alt=""/>
                	<h3>${aboutShow.name}</h3>
                	<h2>${aboutShow.premiered}</h2>
                </div>
                <div class="modal-right-side">
				<div class="top-exit-bar">
					<div><img src="close-button.svg" class="exit"></div>
					</div>
                    <p>${aboutShow.summary}</p>
                    </div>
                </div>
                `;
	return html;
}

async function about(id) {
	if (id == null) {
		myModalContent.innerHTML = `
								<div class="no-information-error">
								<div class="top-exit-bar">
									<div>
										<img src="close-button.svg" class="exit">
									</div>
								</div>
								<div class="error-image">
									<img src="popcorn.png">
									<p>There is no information about the show</p>
								</div>`;
		document.querySelector('.my-modal').classList.remove('hide');
	}
	const showid = id.getAttribute('id');
	// console.log(showid);
	const resp = await fetch(`https://api.tvmaze.com/lookup/shows?imdb=${showid}`);
	const json = await resp.json();
	console.log(json);
	myModalContent.innerHTML = showData(json);
	document.querySelector('.my-modal').classList.remove('hide');
}

searchButton.addEventListener('click', () => {
	getShows(searchInput.value);
	searchInput.value = '';
});

searchInput.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		getShows(searchInput.value);
		searchInput.value = '';
	}
});

myModalContent.parentElement.addEventListener('click', (event) => {
	console.log(event.target);
	if (event.target.classList.contains('my-modal') || event.target.classList.contains('exit')) {
		myModal.classList.add('hide');
	}
});

// exit.addEventListener('click', function() {
// 	exit.parentElement.classList.add('hide');
// });

getShows('new');
