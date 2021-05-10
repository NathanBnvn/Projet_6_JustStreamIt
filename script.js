
// Slideshow


window.onload = fetchCategories()

/// Manage Category
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
		//values.forEach(loadView)
		//values.forEach(getMovies(values[0].results))
		//console.log(values[0].results)
		loopMovies(values)
		//loadBestSection()
	})
}

function loopMovies(values){
	for(i of values){
		getMovies(i.results)

	}

}

// function getCategories(categoryUrl){
// 	return new Promise((resolve, reject) => {
// 		fetch("http://127.0.0.1:8000/api/v1/titles/?" + categoryUrl + "&sort_by=-imdb_score").then(response => {
// 			return response.json()
// 		}).then(categories => {
// 			resolve(categories)
// 			console.log(categoryUrl)
// 		}).catch(error => {
// 			reject(error)
// 		})
// 	})
// }

// function nextPage(next) {
// 	return new Promise((resolve, reject) => {
// 		fetch(next).then(response => {
// 			return response.json()
// 		}).then(url => {
// 			return 
// 		})

// 	})

// }

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
	})
}

segments = []
images = []
titles = []
descriptions = []

function storeData(id, title, image_url, description) {
	//segments.push(segment)
	titles.push(id.title)
	images.push(id.image_url)
	descriptions.push(id.description)

	if(titles.length == 40){
		loadHeadMovie(titles, images, descriptions)

		for(var e = 1; e < 40; e++){
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

	if(e < 5) {
		loadBestCategory(segment)
	}else if(e > 9 && e < 14){
		loadFirstCategory(segment)
	}else if(e > 19 && e < 24){
		loadSecondCategory(segment)
	}else if(e > 29 && e < 34){
		loadThirdCategory(segment)
	}

 }

function loadBestCategory(segment){
	bestSection = document.getElementById('bestcategory')
	nextButton = document.getElementById("nextBestCategory")
	bestSection.insertBefore(segment, nextButton)
}

function loadFirstCategory(segment){
	firstSection = document.getElementById('firstcategory')
	nextButton = document.getElementById("nextFirstCategory")
	firstSection.insertBefore(segment, nextButton)
}

function loadSecondCategory(segment){
	secondSection = document.getElementById('secondcategory')
	nextButton = document.getElementById("nextSecondCategory")
	secondSection.insertBefore(segment, nextButton)
}

function loadThirdCategory(segment){
	thirdSection = document.getElementById('thirdcategory')
	nextButton = document.getElementById("nextThirdCategory")
	thirdSection.insertBefore(segment, nextButton)
}


