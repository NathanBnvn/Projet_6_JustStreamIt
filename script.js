
window.onload = fetchCategories()

//counter = 1
maxResultCount = 40
segments = []
images = []
titles = []
genres = []
descriptions = []
longDescriptions = []
dates = []
rates = []
imdbScores = []
director = []
actor = []
durations = []
origins = []
boxOffices = []

let overlayer = document.getElementById("overlayer")
let modal = document.getElementById("modal")
let closeButton = document.getElementById("closeButton")

sectionWidth = document.getElementById("bestcategory").offsetWidth

incrementValue = sectionWidth / 4 * 3 //counter

/////////////////////////--- Possibilité de refactoriser ---////////////////////////////

trackBest = document.getElementById("trackZero")
trackFirst = document.getElementById("trackOne")
trackSecond = document.getElementById("trackTwo")
trackThird = document.getElementById("trackThree")

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
	trackBest.style.transform = `translateX(-${incrementValue}px)`;
})

previousFirst.addEventListener("click", () => {
	trackFirst.style.transform = `translateX(${0}px)`
})

nextFirst.addEventListener("click", () => {
	trackFirst.style.transform = `translateX(-${incrementValue}px)`;
})

previousSecond.addEventListener("click", () => {
	trackSecond.style.transform = `translateX(${0}px)`
})

nextSecond.addEventListener("click", () => {
	trackSecond.style.transform = `translateX(-${incrementValue}px)`;
})

previousThird.addEventListener("click", () => {
	trackThird.style.transform = `translateX(${0}px)`
})

nextThird.addEventListener("click", () => {
	trackThird.style.transform = `translateX(-${incrementValue}px)`;
})

///////////////////////////////////////////////////////////////////////////////////////


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

function storeData(id, title, image_url, description){
	titles.push(id.title)
	images.push(id.image_url)
	descriptions.push(id.description)
	longDescriptions.push(id.long_description)
	dates.push(id.date_published)
	rates.push(id.rated)
	imdbScores.push(id.imdb_score)
	director.push(id.directors)
	actor.push(id.actors)
	durations.push(id.duration)
	origins.push(id.countries)
	genres.push(id.genre)
	boxOffices.push(id.worldwide_gross_income)

	if(titles.length == maxResultCount){
		loadHeadMovie(titles, images, descriptions)
		// console.log(boxOffices)

		for(var element = 1; element < 41; element++){
			loadView(element)
			test()
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

function loadView(element){
	var segment = document.createElement("div")
	segment.className = "segment"

	var image = document.createElement("img")
	image.src = images[element]

	var headline = document.createElement("h3")
	var titleNode = document.createTextNode(titles[element])
	headline.appendChild(titleNode)

	var moreButton = document.createElement("button")
	moreButton.className = "moreButton"
	moreButton.onclick = function(){
	 	modal.style.display = "block";
	 	overlayer.style.display = "block";
	}

	var paragraph = document.createElement("p")
	var paragraphNode = document.createTextNode(descriptions[element])
	paragraph.appendChild(paragraphNode)

	segment.appendChild(image)
	segment.appendChild(headline)
	segment.appendChild(moreButton)
	segment.appendChild(paragraph)

	if(element < 8) {
		trackBest.appendChild(segment)
	}else if(element > 9 && element < 17){
		trackFirst.appendChild(segment)
	}else if(element > 19 && element < 27){
		trackSecond.appendChild(segment)
	}else if(element > 29 && element < 37){
		trackThird.appendChild(segment)
	}
 }

function test(){

	// moreButtons.forEach(button => {
	// 	button.addEventListener('click', () => {
	// 		console.log('2')
	// 	})
	// })
	// moreButton.onclick = function(){
	// 	modal.style.display = "block";
	// }

	detailButtons = document.querySelectorAll('.moreButton')
	if(detailButtons.length == 29){
		for(let number = 0; number < detailButtons.length; number++){
			detailButtons[number].addEventListener("click", function(){
				//console.log(number)
				modalComponent(number);
			})
		}
	}

	closeModal()

}

function closeModal(){
	closeButton.onclick = function(){
		modal.style.display = "none"
		overlayer.style.display = "none"
		cleanModal()
	}

	window.onclick = function(event){

		if (event.target == overlayer) {
			modal.style.display = "none"
			overlayer.style.display = "none"
			cleanModal()
		}
	}

}

function cleanModal(){

}

///////////////////-- naming à améliorer --////////////////////////////////

function modalComponent(number){
	picture = document.getElementById("picture")
	titled = document.getElementById("titleModal")
	dated = document.getElementById("date")
	durationd = document.getElementById("duration")
	genred = document.getElementById("genre")
	origind = document.getElementById("origin")
	rate = document.getElementById("rate")
	imdbScoreX = document.getElementById("imdbScore")
	boxOfficed = document.getElementById("boxOffice")
	directord = document.getElementById("director")
	actord = document.getElementById("actors")
	descriptiond = document.getElementById("description")

	console.log(number)
	picture.src = images[number]
	var titleN = document.createTextNode(titles[number])
	var date = document.createTextNode(dates[number])
	var rated = document.createTextNode(rates[number])
	var imdbScore = document.createTextNode(imdbScores[number])
	var directors = document.createTextNode(director[number])
	var actors = document.createTextNode(actor[number])
	var duration = document.createTextNode(durations[number])
	var origin = document.createTextNode(origins[number])
	var boxOffice = document.createTextNode(boxOffices[number])
	var description = document.createTextNode(longDescriptions[number])
	var genre = document.createTextNode(genres[number])

	titled.appendChild(titleN)
	dated.appendChild(date)
	durationd.appendChild(duration)
	genred.appendChild(genre)
	origind.appendChild(origin)
	rate.appendChild(rated)
	imdbScoreX.appendChild(imdbScore)
	boxOfficed.appendChild(boxOffice)
	directord.appendChild(directors)
	actord.appendChild(actors)
	descriptiond.appendChild(description)
}
