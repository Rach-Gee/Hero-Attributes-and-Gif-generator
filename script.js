// Global variables
var heroG = document.querySelector('#hero-gif');
var giphyAPIKey = 'J93RdrgwiH30xTwsClipfYXrfhml0fkg'
var statsAPIKey = '10160024845509883'
var resultImgEl = document.getElementById('hero-gif');
var searchBtn = document.getElementById('btnSearch');
var resultContentEl = document.getElementById('text-content');
var headerEl = document.getElementById('header-hero')
var prevSearchBtnEl = document.getElementById('prevSearchBtns');
var mainEl = document.getElementById('main');
var noHeroEl = document.getElementById('no-hero');
var imgSearchedEl = document.getElementById('img-searched');
var clearBtn = document.getElementById('go-back');
var resultContentBioEl = document.getElementById('text-content-Bio');
var prevSearchBtnEl = document.getElementById('prevSearchBtns');
var imgSearchedEl = document.getElementById('img-searched');
var heroNameChosen = ''

//function to fetch hero API using the input from the end user
function searchApi(heroName, btnAppend) {
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
      if (dataH.response === 'error') {
        noHeroEl.classList.remove('hide')
        mainEl.classList.add('hide')
        headerEl.classList.remove('hide')
      } else {
        noHeroEl.classList.add('hide')
        var arraySearch = dataH.results.filter(function (heroRecord) {
          return heroRecord.name.toUpperCase() === heroName.trim().toUpperCase();
        })
        console.log(arraySearch);
        const heroID = arraySearch[0].id;
        console.log(heroID);
        statsAPI(heroID)
        searchGifApi(heroName)
      }
    })

  //function to fetch hero API using the ID from the first fetch
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
        printResults(dataS, btnAppend);
      })
  }

  //fetch Giphy API using the input from the end user
  function searchGifApi(heroName, btnAppend) {
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

  }
}

// appending the gif to the page
function printIMG(data) {
  imgSearchedEl.innerHTML = ''
  var imgEl = document.createElement('img');
  imgEl.src = (data.data[0].images.downsized_large.url)
  imgSearchedEl.classList.add('img-searched')
  imgSearchedEl.append(imgEl);
}

//rendering results for Hero attributes on page 
function printResults(resultObj, btnAppend) {
  console.log(resultObj);
  resultContentEl.innerHTML = ''


  //creating element
  var resultCard = document.createElement('div');
  var resultBody = document.createElement('div');
  mainEl.classList.remove('hide')
  headerEl.classList.add('hide')

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

  document.getElementById('hero-input').value = "";

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
    }
  }
}

// Load data from local storage on load 
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

// runs handleSearchFormSubmit when end user picks a hero
document.getElementById('user-form').addEventListener('submit', handleSearchFormSubmit)

//handles deleting local strage and previous search buttons 
clearBtn.addEventListener("click", function () {
  prevSearchBtnEl.innerHTML = "";
  window.localStorage.clear();
})



