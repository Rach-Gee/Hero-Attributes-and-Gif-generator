var heroG = document.querySelector('#hero-gif');

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
    console.log(data['power']);
   
  }); 

 

/*fetch('https://superheroapi.com/api/10160024845509883', {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
*/
  
