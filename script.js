
window.onload = fetchCategories()

//counter = 1
segments = []
images = []
titles = []
descriptions = []

trackBest = document.getElementById("trackZero")
trackFirst = document.getElementById("trackOne")
trackSecond = document.getElementById("trackTwo")
trackThird = document.getElementById("trackThree")

sectionWidth = document.getElementById("bestcategory").offsetWidth

let previousBest = document.getElementById("previousBestCategory")
let nextBest = document.getElementById("nextBestCategory")
let previousFirst = document.getElementById("previousFirstCategory")
let nextFirst = document.getElementById("nextFirstCategory")
let previousSecond = document.getElementById("previousSecondCategory")
let nextSecond = document.getElementById("nextSecondCategory")
let previousThird = document.getElementById("previousThirdCategory")
let nextThird = document.getElementById("nextThirdCategory")

previousBest.addEventListener("click", () => {
	trackBest.style.transform = `translateX(${0}px)`
})
nextBest.addEventListener("click", () => {
	incrementValue = sectionWidth / 4 * 3 //counter
	trackBest.style.transform = `translateX(-${incrementValue}px)`;
})

previousFirst.addEventListener("click", () => {
	trackFirst.style.transform = `translateX(${0}px)`
})

nextFirst.addEventListener("click", () => {
	incrementValue = sectionWidth / 4 * 3 //counter
	trackFirst.style.transform = `translateX(-${incrementValue}px)`;
})

previousSecond.addEventListener("click", () => {
	trackSecond.style.transform = `translateX(${0}px)`
})

nextSecond.addEventListener("click", () => {
	incrementValue = sectionWidth / 4 * 3 //counter
	trackSecond.style.transform = `translateX(-${incrementValue}px)`;
})

previousThird.addEventListener("click", () => {
	trackThird.style.transform = `translateX(${0}px)`
})

nextThird.addEventListener("click", () => {
	incrementValue = sectionWidth / 4 * 3 //counter
	trackThird.style.transform = `translateX(-${incrementValue}px)`;
})


function fetchCategories(){
	var cat1 = fetch("http://127.0.0.1:8000/api/v1/titles/?imdb_score_min=9&sort_by=-imdb_score")
	var cat2 = fetch("http://127.0.0.1:8000/api/v1/titles/?imdb_score_min=9&page=2&sort_by=-imdb_score")
	var cat3 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score")
	var cat4 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Animation&page=2&sort_by=-imdb_score")
	var cat5 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score")
	var cat6 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Comedy&page=2&sort_by=-imdb_score")
	var cat7 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Crime&sort_by=-imdb_score")
	var cat8 = fetch("http://127.0.0.1:8000/api/v1/titles/?genre=Crime&page=2&sort_by=-imdb_score")

	Promise.all([cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8]).then(values => {
		return Promise.all(values.map(res => res.json()))
	}).then(values => {
		loopMovies(values)
	})
}

function loopMovies(values){
	for(i of values){
		getMovies(i.results)
	}
}

function getMovies(results){
	var movie1 = fetch(results[0].url)
	var movie2 = fetch(results[1].url)
	var movie3 = fetch(results[2].url)
	var movie4 = fetch(results[3].url)
	var movie5 = fetch(results[4].url)

	Promise.all([movie1, movie2, movie3, movie4, movie5]).then(values => {
		return Promise.all(values.map(res => res.json()))
	}).then(values => {
		values.forEach(storeData)
		//console.log(values)
	})
}

function storeData(id, title, image_url, description) {
	titles.push(id.title)
	images.push(id.image_url)
	descriptions.push(id.description)

	if(titles.length == 40){
		loadHeadMovie(titles, images, descriptions)
		//console.log(titles)

		for(var e = 1; e < 41; e++){
			loadView(e)
		}
	}
}

function loadHeadMovie(titles, images, descriptions){
	document.getElementById("headmovie").setAttribute("style", "background-image: url("+ images[0] +")")
	
	title = document.getElementById("title")
	var titleNode = document.createTextNode(titles[0])
	title.appendChild(titleNode)

	description = document.getElementById("plot")
	var descriptionNode = document.createTextNode(descriptions[0])
	description.appendChild(descriptionNode)
}

function loadView(e){
	var segment = document.createElement("div")
	segment.className = "segment"

	var image = document.createElement("img")
	image.src = images[e]

	var headline = document.createElement("h3")
	var titleNode = document.createTextNode(titles[e])
	headline.appendChild(titleNode)

	var moreButton = document.createElement("button")
	moreButton.className = "moreButton"

	var paragraph = document.createElement("p")
	var paragraphNode = document.createTextNode(descriptions[e])
	paragraph.appendChild(paragraphNode)

	segment.appendChild(image)
	segment.appendChild(headline)
	segment.appendChild(moreButton)
	segment.appendChild(paragraph)

	if(e < 8) {
		trackBest.appendChild(segment)
	}else if(e > 9 && e < 17){
		trackFirst.appendChild(segment)
	}else if(e > 19 && e < 27){
		trackSecond.appendChild(segment)
	}else if(e > 29 && e < 37){
		trackThird.appendChild(segment)
	}
 }


