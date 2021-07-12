var heroG = document.querySelector('#hero-gif');
var giphyAPIKey = 'J93RdrgwiH30xTwsClipfYXrfhml0fkg'
var resultImgEl = document.getElementById('hero-gif');
var searchBtn = document.getElementById('btnSearch');

/*
fetch('https://superheroapi.com/api.php/10160024845509883/332/powerstats', {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data['power']);
   
  }); */

 


  
//function to fetch Giphy API using the input from the end user
function searchApi(heroName) {
  if (heroName) {
    var locQueryUrlG = 'https://api.giphy.com/v1/gifs/search?api_key=' + giphyAPIKey + '&q=' + heroName 
  }

  fetch(locQueryUrlG, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      printResults(data)
    })
} 


//Passing end user search to the API fetch function
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var heroInputVal = document.getElementById('hero-input').value;

  if (!heroInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(heroInputVal);
}

document.getElementById('user-form').addEventListener('submit', handleSearchFormSubmit)


/*
//rendering results for Giphy
function printResults(resultObj) {
  console.log(resultObj);
  resultImgEl.innerHTML = ''

  //creating element
  var resultCard = document.createElement('div');

  var imgEl = document.createElement('img');
  var heroGifEl = resultObj.**
  image.setAttribute('src', heroGifEl)
  resultCard.append(imgEl)

  //appending data to the page
  resultImgEl.append(resultCard);
}
*/

//var heroGifEl = "https://media4.giphy.com/media/xFBnkMvpTM6m4/giphy-preview.gif?cid=224b9feeb0mpfd8o9asumgjmc060qwl4addfjt5pddjuc5q1&rid=giphy-preview.gif&ct=g"