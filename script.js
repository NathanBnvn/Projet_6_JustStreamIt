
// Slideshow




/*
const title = document.getElementById('videoTitle')

const img = document.getElementById('feature');

fetch('http://127.0.0.1:8000/api/v1/titles/2646')
	.then(res =>  res.json())
	.then(data => {
		title.innerHTML = data.title
		img.src = data.image_url
	})


		for(image_url in data.results){
			var v = 0
			var bestMoviesImages = document.createElement("img");
			bestMoviesImages.src = data.results[v].image_url;


			var slideshow = document.getElementsByClassName("case");
			slideshow.appendChilds(bestMoviesImages);
			v =+ 1
		}

//



			var div = document.createElement("div")
			div.className = "case"

			var image = document.createElement("img")
			var img = data.results[resultValue].image_url
			image.src = img

			var headline = document.createElement("h3")
			var title = data.results[resultValue].title
			var node = document.createTextNode(title)
			headline.appendChild(node)

			var moreButton = document.createElement("button")
			moreButton.className = "moreButton"

			div.appendChild(image)
			div.appendChild(headline)
			div.appendChild(moreButton)
			div.appendChild(plotStructure)

			descriptionURL = data.results[resultValue].url

			section.insertBefore(div, nextButton)
			resultValue ++

			return fetch(descriptionURL)


*/

const section = document.getElementById('bestcategory')
const nextButton = document.getElementById('nextBestCategory')


fetch('http://127.0.0.1:8000/api/v1/titles/?imdb_score_min=9&sort_by=-imdb_score')
	.then(res => res.json())
	.then(data => { 
		data.results.forEach(loadView)
		//return fetch(loadView.descriptionURL)
	})
// 	.then(res => res.json())
// 	.then(data => {
// 		var plot = data.description
// 		var text = document.createElement("p")
// 		var content = document.createTextNode(plot)
// 		text.appendChild(content)

// 		plotStructure.appendChild(text)
// })


function loadView(id, title, image_url, url) {
	var div = document.createElement("div")
	div.className = "case"

	var image = document.createElement("img")
	var img = id.image_url
	image.src = img

	var headline = document.createElement("h3")
	var title = id.title
	var node = document.createTextNode(title)
	headline.appendChild(node)

	var moreButton = document.createElement("button")
	moreButton.className = "moreButton"
	
	var plotStructure = document.createElement("div")
	//plotStructure.className = "plotStructure"
	plotStructure.id = "plotStructure"

	div.appendChild(image)
	div.appendChild(headline)
	div.appendChild(moreButton)
	div.appendChild(plotStructure)

	descriptionURL = id.url

	section.insertBefore(div, nextButton)
	
	//loadplot(descriptionURL)
}

//  function loadplot(descriptionURL){
//  	fetch(descriptionURL)
//  	.then(res => res.json())
//  	.then(data => {
//  		var plot = data.description
//  		console.log(plot)
//   		var text = document.createElement("p")
//   		var content = document.createTextNode(plot)
//   		text.appendChild(content)

//   		set = document.getElementById("plotStructure")
//   		set.appendChild(text)
//  	})
// }