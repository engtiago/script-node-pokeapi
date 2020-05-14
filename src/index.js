const request = require("request");
const jsonfile = require("jsonfile");
// const pokemons = require('./pokemons.json');
let pokemons = [];

 function inclui(id) {
  setTimeout(function() {  
  let PokeOBJ = {}
  let UrlType = ''
   request(`https://pokeapi.co/api/v2/pokemon/${id}`, (err,response,body)=>{
    // console.log('statusCode:', response && response.statusCode)
   if(response.statusCode === 200){
     let obj = JSON.parse(body)
        PokeOBJ.id= obj.id
        PokeOBJ.name= obj.name
        PokeOBJ.height = obj.height
        PokeOBJ.weight = obj.weight
        PokeOBJ.types = []
        obj.types.forEach(el => {
          PokeOBJ.types[el.slot - 1] = el.type.name
          if (el.slot === 1) {
            UrlType = el.type.url
          }
          });
          request(UrlType, (err,response,body)=>{
            if(response.statusCode === 200){
              let obj = JSON.parse(body)
              PokeOBJ.weaknesses = []
                 obj.damage_relations.double_damage_from.forEach(el => {
                   PokeOBJ.weaknesses.push(el.name)
                   });
               console.log('type:' ,id);
               pokemons.push(PokeOBJ)
               jsonfile.writeFile("./src/pokemons.json",pokemons);
             }else{
               console.log('erro type:',id);
               inclui(id)
             }
           });
          
      console.log('info:' ,id);
    }else{
      console.log('erro info:',id);
      inclui(id)
    }     
  });

  }, id * 2200);
}

for (let i = 1; i <= 807; i++) {
  inclui(i)
}


 