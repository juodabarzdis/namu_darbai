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
const dropdown = document.querySelector('.dropdown-content');

async function getByGenre(genre) {
	const [
		showsOne,
		showsTwo,
		showsThree,
		showsFour,
		showsFive,
		showsSix,
		showsSeven,
		showsEight,
		showsNine,
		showsTen
	] = await Promise.all([
		fetch('https://api.tvmaze.com/shows?page=0'),
		fetch('https://api.tvmaze.com/shows?page=1'),
		fetch('https://api.tvmaze.com/shows?page=2'),
		fetch('https://api.tvmaze.com/shows?page=3'),
		fetch('https://api.tvmaze.com/shows?page=4'),
		fetch('https://api.tvmaze.com/shows?page=5'),
		fetch('https://api.tvmaze.com/shows?page=6'),
		fetch('https://api.tvmaze.com/shows?page=7'),
		fetch('https://api.tvmaze.com/shows?page=8'),
		fetch('https://api.tvmaze.com/shows?page=9')
	]);
	// const resp = await fetch(`https://api.tvmaze.com/shows`);
	const one = await showsOne.json();
	const two = await showsTwo.json();
	const three = await showsThree.json();
	const four = await showsFour.json();
	const five = await showsFive.json();
	const six = await showsSix.json();
	const seven = await showsSeven.json();
	const eight = await showsEight.json();
	const nine = await showsNine.json();
	const ten = await showsTen.json();

	let json = one.concat(two, three, four, five, six, seven, eight, nine, ten);
	console.log(json);
	let html = '';
	// console.log(json);
	let arr = json.filter(function(shows) {
		return shows.genres.includes(genre);
	});

	arr.map(function(show) {
		// console.log(show);
		html += showByGenre(show);
		document.getElementById('container').innerHTML = html;
		// document.querySelector('.pagination').innerHTML = pagination(arr.length, (current = 1));
		// console.log(show.image.medium);
	});

	function showByGenre(show) {
		let genre = show.genres[0];
		let html = `
 					<div class="card">
					<div class="hover-genre"><p>${genre}</p></div>
					<a href="#" id="${show.externals.imdb}" onclick="about(${show.externals.imdb})"><img src="${show.image
			.medium}" alt=""/></a>
	    <h3>${show.name}</h3>
	    </div>
	    `;

		return html;
	}
}

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
	let genre = data.show.genres[1];
	if (genre == null) {
		genre = 'Information not found';
	}
	// console.log(genre[1]);
	let html = `
            <div class="card">
			<div class="hover-genre"><p>${genre}</p></div>
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

searchButton.addEventListener('click', (event) => {
	event.preventDefault();
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

dropdown.addEventListener('click', (event) => {
	event.preventDefault();
	let genre = event.target.textContent;
	getByGenre(`${genre}`);
});

myModal.addEventListener('click', (event) => {
	event.preventDefault();
});

// exit.addEventListener('click', function() {
// 	exit.parentElement.classList.add('hide');
// });

getShows('new');
// getShows('new');
