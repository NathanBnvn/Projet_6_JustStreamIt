window.onload = fetchURL(), manageCarrousel(); 

let urls = []
let pictures = []
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

// Récupère les données que je stocke dans un tableau pour mieux appeler les urls

async function fetchMovies(results){
	for(let n = 0; n < results.length; n++){
		url = results[n].url
		urls.push(url)
	}

	if(urls.length == 40){
		for (var i = 0; i < urls.length; i++) {
		 	var movie = await fetch(urls[i])
		 	var data = await movie.json()
		 	parseImages(data)
		}
	}

}

// Rassemble les urls des images qui sont ensuite filtrer puis afficher

function parseImages(data){
	pictures.push(data.image_url)
	
	if(pictures.length == 40){
		var images = pictures.filter(function(element, index){
			return surplus.indexOf(index) == -1
		})

		for(let i = 0; i < images.length; i++) {
			picture = document.querySelectorAll('img')[i];
			picture.src = images[i]

			picture.addEventListener("click", function(){
				openModal()
			})
		}
	}
}

function loadTopMovie(titles, images, descriptions){
	let play = document.getElementById("play-button")
	
	title = document.getElementById("title")
	var titleNode = document.createTextNode("")
	title.appendChild(titleNode)

	description = document.getElementById("description")
	var descriptionNode = document.createTextNode("")
	description.appendChild(descriptionNode)

	play.onclick = function(){
		openModal()
	}
}

// gère l'ouverture des fenêtres modals

function openModal(){
	modal.style.display = "block"
	

	// console.log(pictures)

	// pictures.forEach(imageButton => {
	//  	imageButton.addEventListener("click", () => {
	//  		modal.style.display = "block"
	//  	})
	// })
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
