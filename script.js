window.onload = fetchURL(), manageCarrousel(), closeModal(); 

let urls = []
var pictures = []
var movies = []
let maxResults = 40
let surplus = [8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 40]

// Fait bloucler les diverses urls dans fetch

async function fetchURL(){
	let categories = ["", "", "animation", "animation", "comedy", "comedy", "crime", "crime"]
	let pages = ["page=1", "page=2", "page=1", "page=2", "page=1", "page=2", "page=1", "page=2"]

	for(let i = 0; i < categories.length; i++){
		category = categories[i];
		page = pages[i];
		var movie = await fetch("http://127.0.0.1:8000/api/v1/titles/?genre=" + category + "&" + page + "&sort_by=-imdb_score")
		var data = await movie.json()
		fetchMovies(data.results)
	}
}

// Récupère les données que je stocke dans un tableau pour mieux appeler les urls puis je crée un tableau par film

async function fetchMovies(results){
	for(let n = 0; n < results.length; n++){
		url = results[n].url
		urls.push(url)
	}

	if(urls.length == maxResults){
		for (var i = 0; i < urls.length; i++) {
		 	var movie = await fetch(urls[i])
		 	var data = await movie.json()
		 	this["movie" + i] = [data.image_url, data.title, data.genres, data.date_published, data.rated, data.imdb_score, data.directors, data.actors, data.duration, data.countries, data.worldwide_gross_income, data.long_description]
		}
		loadTopMovie()
		parseImages()
	}
}

// Je filtre l'ensemble de mes résultats pour garder les 29 attendus

function parseImages(){
	var filter = surplus.find(excedent => excedent == i)
	photoframe = document.querySelectorAll('img')

	for(var i = 0; i < maxResults; i++){
		var filter = surplus.find(excedent => excedent == i)
		if(! (i == filter)){
			picture = this["movie" + i][0]
			movie = this["movie" + i]
			pictures.push(picture)
			movies.push(movie)
		}
	}

	for(var n = 0; n < 29; n++){
		photoframe = document.querySelectorAll('img')[n]
		photoframe.src = pictures[n]

		if(n > 0){
			photoframe.addEventListener("click", function(){
			openModal()
		})
		}
	}
}

function loadTopMovie(){
	let play = document.getElementById("play-button")
	
	title = document.getElementById("title")
	title.textContent = movie0[1]

	description = document.getElementById("description")
	description.textContent = movie0[11]

	play.onclick = function(){
		openModal()
	}
}

// Gère l'ouverture des fenêtres modals et l'affichage de celles-ci

function openModal(){
	modal.style.display = "block"
	var eventSender = event.currentTarget

	var imageModal = document.getElementById("modal-picture")
	var titleModal = document.getElementById("modal-title")
	var paragraph = document.getElementById("modal-paragraph")
	paragraph.setAttribute("style", "white-space: pre")

	if(eventSender.id == "play-button"){
		imageModal.src = movies[0][0]
		titleModal.textContent = movies[0][1]
		paragraph.textContent = "Genre: "+ movies[0][2] +", Date de sortie: "+ movies[0][3] +", Durée: " + movies[0][8] +"\r\n"
		paragraph.textContent += "Note: "+ movies[0][4] +", Score IMDB: "+ movies[0][5] + ", Box Offices: "+ movies[0][10] +"\r\n"
		paragraph.textContent += "Producteur: " + movies[0][6] + ", Acteurs: "+ movies[0][7] + ", Origine: "+ movies[0][9] +"\r\n"
		paragraph.textContent += "Synopsis: \r\n" + movies[0][11]

	} else {
		imageModal.src = movies[eventSender.id][0]
		titleModal.textContent =  movies[eventSender.id][1]
		paragraph.textContent = "Genre: "+ movies[eventSender.id][2] +", Date de sortie: "+ movies[eventSender.id][3] +", Durée: " + movies[eventSender.id][8] +"\r\n"
		paragraph.textContent += "Note: "+ movies[eventSender.id][4] +", Score IMDB: "+ movies[eventSender.id][5] + ", Box Offices: "+ movies[eventSender.id][10] +"\r\n"
		paragraph.textContent += "Producteur: " + movies[eventSender.id][6] + ", Acteurs: "+ movies[eventSender.id][7] + ", Origine: "+ movies[eventSender.id][9] +"\r\n"
		paragraph.textContent += "Synopsis: \r\n" + movies[eventSender.id][11]
	}
}

function closeModal(){
	var close = document.getElementById("close-button")

	close.onclick = function(){
		modal.style.display = "none"
	}

	window.onclick = function(event){
		if (event.target == modal) {
			modal.style.display = "none"
		}
	}
}

// Gère le fonctionnement du carrousel

function manageCarrousel(){
	const nextButtons = document.querySelectorAll("[data-track-next]")
	sectionWidth = document.getElementsByClassName("slideshow-container")[0].offsetWidth
	incrementValue = sectionWidth / 4 * 3 

	nextButtons.forEach(button => {
		button.addEventListener("click", () => {
			const track = document.querySelector(button.dataset.trackNext)
			track.style.transform = `translateX(-${incrementValue}px)`
		})
	})

	const previousButtons = document.querySelectorAll("[data-track-previous]")
	previousButtons.forEach(button => {
		button.addEventListener("click", () => {
			const track = document.querySelector(button.dataset.trackPrevious)
			track.style.transform = `translateX(${0}px)`
		})
	})
}
