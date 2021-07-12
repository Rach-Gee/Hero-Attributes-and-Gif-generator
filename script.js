var heroG = document.querySelector('#hero-gif');

var resultContentEl = document.getElementById('text-content');

fetch('https://api.giphy.com/v1/gifs/search?api_key=J93RdrgwiH30xTwsClipfYXrfhml0fkg&q=hulk', {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  var heroGifEl = "https://media4.giphy.com/media/xFBnkMvpTM6m4/giphy-preview.gif?cid=224b9feeb0mpfd8o9asumgjmc060qwl4addfjt5pddjuc5q1&rid=giphy-preview.gif&ct=g"
  
  var image = document.createElement("img");

  image.setAttribute('src', heroGifEl)

  heroG.appendChild(image)

fetch('https://superheroapi.com/api.php/10160024845509883/332/powerstats', {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    printResults(data);
    


    
  }); 

 



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
 



  
