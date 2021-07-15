var heroG = document.querySelector('#hero-gif');
var giphyAPIKey = 'J93RdrgwiH30xTwsClipfYXrfhml0fkg'
var statsAPIKey = '10160024845509883'
var resultImgEl = document.getElementById('hero-gif');
var searchBtn = document.getElementById('btnSearch');
var resultContentEl = document.getElementById('text-content');
var resultContentBioEl = document.getElementById('text-content-Bio');
var prevSearchBtnEl = document.getElementById('prevSearchBtns');
var mainEl = document.getElementById('main');
var imgSearchedEl = document.getElementById('img-searched');
var heroNameChosen = ''

//function to fetch Giphy API using the input from the end user
function searchApi(heroName, btnAppend) {
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
      printIMG(data)
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
      var arraySearch = dataH.results.filter(function(heroRecord) {
        return heroRecord.name.toUpperCase() === heroName.trim().toUpperCase();
      })
      console.log(arraySearch);
      const heroID = arraySearch[0].id;
      console.log(heroID);
      statsAPI(heroID)
     // bioAPI(heroID)
    })

  function statsAPI(heroID) {
    var locQueryUrlS = 'https://superheroapi.com/api.php/' + statsAPIKey + '/' + heroID + '/powerstats'

    fetch(locQueryUrlS, {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (dataS) {
        console.log(dataS);
        heroNameChosen = dataS.name
        printResults(dataS,btnAppend);
      })
  }
/*
  function bioAPI(heroID) {
    var locQueryUrlB = 'https://superheroapi.com/api.php/' + statsAPIKey + '/' + heroID + '/biography'

    fetch(locQueryUrlB, {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (dataB) {
        console.log(dataB);
        heroNameChosen = dataB.name
        printResultsB(dataB);
      })
  }*/

}

function printIMG(data) {
  imgSearchedEl.innerHTML = ''
  var imgEl = document.createElement('img');
  imgEl.src = (data.data[0].images.downsized_large.url)
  imgSearchedEl.classList.add('img-searched')

  imgSearchedEl.append(imgEl);
}

//rendering results for current days on page 
function printResults(resultObj, btnAppend) {
  console.log(resultObj);
  resultContentEl.innerHTML = ''

  //creating element
  var resultCard = document.createElement('div');
  var resultBody = document.createElement('div');
  mainEl.classList.remove('hide-2')

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
  prevBtn(btnAppend)
}

//Passing end user search to the API fetch function
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var heroInputVal = document.getElementById('hero-input').value;

  if (!heroInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(heroInputVal, true);
}

document.getElementById('user-form').addEventListener('submit', handleSearchFormSubmit)

//adding pervious searches to aside tag in HTML
function prevBtn(btnAppend) {
  var prevSearchBtn = document.createElement('button');

  var prevSearchArray = JSON.parse(localStorage.getItem("prevSearchHero"));
  if (prevSearchArray == null) {
    prevSearchArray = []
  }
  response = heroNameChosen;

  if (btnAppend) {
  prevSearchArray.push(response);
  localStorage.setItem("prevSearchHero", JSON.stringify(prevSearchArray));
  console.log(prevSearchArray);

  prevSearchBtn.textContent = JSON.parse(localStorage.getItem("prevSearchArray"));


  for (var i = 0; i < prevSearchArray.length; i++) {
    prevSearchBtn.textContent = prevSearchArray[i];

    prevSearchBtnEl.append(prevSearchBtn);
    prevSearchBtnEl.addEventListener('click', prevHeroChosen)
  }}
}

// Load data from local storage
window.onload = function () {

  var prevSearchArray = JSON.parse(localStorage.getItem("prevSearchHero"));
  if (prevSearchArray) {
    localStorage.setItem("prevSearchHero", JSON.stringify(prevSearchArray));

    for (var i = 0; i < prevSearchArray.length; i++) {
      var prevSearchBtn = document.createElement('button');
      prevSearchBtn.textContent = prevSearchArray[i];
      prevSearchBtnEl.append(prevSearchBtn);
      prevSearchBtnEl.addEventListener('click', prevHeroChosen)
    }
  }
};

//making the pervious searches avalible to the searchApi function so these buttons are now interactive
function prevHeroChosen(e) {
  e.target.innerText
  console.dir(e.target)
  searchApi(e.target.innerText, false)
}

document.getElementById('user-form').addEventListener('submit', handleSearchFormSubmit)

// create a btn that when clicked will delete the local storage



// create the btn
document.getElementById('go-back').addEventListener('click', handleSearchFormSubmit)

// function stating what to clear when run
function deleteStorage() {
  localStorage.clear();
}

// runs functions once the go back btn is clicked
document.getElementById('go-back').onclick = deleteStorage;


/*
//rendering results for current days on page 
function printResultsB(resultObjBio) {
  console.log(resultObjBio);
  resultContentBioEl.innerHTML = ''

  //creating element
  var resultCardBio = document.createElement('div');
  var resultBodyBio = document.createElement('div');
  mainEl.classList.remove('hide-2')

  resultCardBio.append(resultBodyBio);

  var publishEl = document.createElement('p');
  publishEl.textContent = 'Published by: ' + resultObjBio.publisher

  var appearanceEl = document.createElement('p');
  appearanceEl.innerHTML = "First Appeared: " + resultObjBio.first-appearance

  var bornInEl = document.createElement('p');
  bornInEl.innerHTML = "Born in: " + resultObjBio.place-of-birth

  //appending data to the page
  resultBodyBio.append(publishEl) //, appearanceEl, bornInEl);
  resultContentBioEl.append(resultCardBio);

}*/



