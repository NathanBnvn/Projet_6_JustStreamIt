window.onload = manageCarrousel(), manageModal();

// Récupérer les images et les urls des films


for(i = 0; i < 8; i++){
	categories = ["", "", "animation", "animation", "comedy", "comedy", "crime", "crime"]
	pages = ["1", "2", "1", "2", "1", "2", "1", "2"]

	category = categories[i]
	page = pages[i]

	if(category == ""){
		getUrls(category, page)
	}

}

function getUrls(category, page){
	url = "http://127.0.0.1:8000/api/v1/titles/?genre=" + category + "&page=" + page + "&sort_by=-imdb_score" 

	fetch(url)
	.then(response => response.json())
	.then(values => loadImages(values))
}



// Afficher les images

function loadTopMovie(titles, images, descriptions){
	image = document.getElementById("image")
	image.src = ""
	
	title = document.getElementById("title")
	var titleNode = document.createTextNode("")
	title.appendChild(titleNode)

	description = document.getElementById("description")
	var descriptionNode = document.createTextNode("")
	description.appendChild(descriptionNode)
}

function loadImages(url){
	console.log(url)
}
// Afficher le contenu de la fenêtre

// les fenêtres modals

function manageModal(){
	var modal = document.getElementById("modal")
	var play = document.getElementById("play-button")
	var close = document.getElementById("close-button")
	// var images = document.querySelectorAll("movie-poster")

	play.onclick = function(){
		modal.style.display = "block"
	}

	//console.log(images)

	//images.forEach(imageButton => {
	// 	imageButton.addEventListener("click", () => {
	// 		modal.style.display = "block"
	// 	})
	// })

	close.onclick = function(){
		modal.style.display = "none"
	}

	window.onclick = function(event){
		if (event.target == modal) {
			modal.style.display = "none"
		}
	}
}

// Le carrousel

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
