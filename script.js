var heroG = document.querySelector('#hero-gif');
var giphyAPIKey = 'J93RdrgwiH30xTwsClipfYXrfhml0fkg'
var statsAPIKey = '10160024845509883'
var resultImgEl = document.getElementById('hero-gif');
var searchBtn = document.getElementById('btnSearch');
var resultContentEl = document.getElementById('text-content');

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
    })

  if (heroName) {
    var locQueryUrlH = 'https://superheroapi.com/api.php/' + statsAPIKey + '/search/' + heroName
  }

  fetch(locQueryUrlH, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (dataH) {
      console.log(dataH);
      const heroID = dataH.results[0].id
      console.log(heroID);
      statsAPI(heroID)
    })

function statsAPI(heroID){
  var locQueryUrlS = 'https://superheroapi.com/api.php/' + statsAPIKey + '/' + heroID + '/powerstats'

  fetch(locQueryUrlS, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (dataS) {
      console.log(dataS);
      printResults(dataS)
    })
}}

//rendering results for current days on page 
function printResults(resultObj) {
  console.log(resultObj);
  resultContentEl.innerHTML = ''

  //creating element

  var resultCard = document.createElement('div');
  //adding classes


  var resultBody = document.createElement('div');

  resultCard.append(resultBody);

  var nameEl = document.createElement('h2');
  nameEl.textContent = resultObj.name

  var intelligenceEl = document.createElement('p');
  intelligenceEl.innerHTML = "Intelligence: " + resultObj.intelligence

  var strengthEl = document.createElement('p');
  strengthEl.innerHTML = "Strength: " + resultObj.strength

  var speedEl = document.createElement('p');
  speedEl.innerHTML = "Speed: " + resultObj.speed

  var durabilityEl = document.createElement('p');
  durabilityEl.innerHTML = "Durability: " + resultObj.durability

  var powerEl = document.createElement('p');
  powerEl.innerHTML = "Power: " + resultObj.power

  var combatEl = document.createElement('p');
  combatEl.textContent = "Combat: " + resultObj.combat;

  //appending data to the page
  resultBody.append(nameEl, intelligenceEl, strengthEl, speedEl, durabilityEl, powerEl, combatEl);
  resultContentEl.append(resultCard);
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
document.getElementById('user-form2').addEventListener('submit', handleSearchFormSubmit)

// create a btn that when clicked will delete the local storage



// create the btn
document.getElementById('go-back').addEventListener('click', handleSearchFormSubmit)

// function stating what to clear when run
function deleteStorage() {
  localStorage.clear();
}

// runs functions once the go back btn is clicked
document.getElementById('go-back').onclick = deleteStorage;


