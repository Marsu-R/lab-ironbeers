const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:

// home route
app.get('/', (req, res) => res.render('index')); 


// beers route
app.get('/beers', (req, res) => {
    
    punkAPI
      .getBeers()
      .then(beersFromApi =>
        // console.log('Beers from the database: ', beersFromApi)
       res.render('beers', {beersArray: beersFromApi})
    //    res.send(beersFromApi)
      )
      .catch(error => console.log(error));

}); 

// random beers route
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerFromApi => {
      // your magic happens here
      res.render("random-beer", {randomBeer: beerFromApi})
    })
    .catch(error => console.log(error));
}); 

app.listen(3000, () => console.log('🏃‍ on port 3000'));
