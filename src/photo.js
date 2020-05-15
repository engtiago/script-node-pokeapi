var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function imgPoke (id) {
    return ('000' + id).slice(-3)  
}

function doSetTimeout(id) {
    setTimeout(function() { 
        download(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgPoke(id)}.png`, `src/pokemons/${imgPoke(id)}.png`, ()=>{
            console.log('done');
        });
    }, id * 1000);
  }
  
  for (let id = 0; id < 890; id++)
    doSetTimeout(id);
  
