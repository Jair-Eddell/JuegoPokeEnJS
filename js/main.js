const CARDS = 10

//peticiion al api

for(let i = 1; i <= CARDS; i++){
    let id = getRandomId(150)
    searchPokemonById(id)
}

function getRandomId(max){
    return Math.floor(Math.random()*max)+1
}

let draggableElements = document.querySelector('.draggable-elements')
let droppableElements = document.querySelector('.droppable-elements')


let pokemonsearch = [];
let pokemoName = [];

async function searchPokemonById(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    //arreglo de los pokes
    pokemonsearch.push(data)
    //arreglos de los names de pokes
    pokemoName.push(data.name)

    pokemoName = pokemoName.sort(()=>Math.random()-0.5)
    
    //dibujando pokes
    draggableElements.innerHTML = ''

    pokemonsearch.forEach(pokemon => {
        draggableElements.innerHTML += `
        <div class="pokemon">
            <img id="${pokemon.name}" draggable = "true" class="img1" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
        </div>`
   })

   //nombres pokemon
   droppableElements.innerHTML = ''
   pokemoName.forEach(name => {
    droppableElements.innerHTML += `
        <div class="names">
            <p>${name}</p>
        </div>`
   })

   //trasformar de notelist a arreglo
   let pokemons = document.querySelectorAll('.img1')
   pokemons = [...pokemons]
   pokemons.forEach(pokemon => {
    pokemon.addEventListener('dragstart', event=>{
        event.dataTransfer.setData('text', event.target.id)
    })
   })

   let names = document.querySelectorAll('.names');
   let wrongMsg = document.querySelector('.wrong');
   let point = 0;
    names = [...names];
    names.forEach(name => {
    name.addEventListener('dragover', event => {
        event.preventDefault();
    });

    name.addEventListener('drop', event => {
        const draggableElementData = event.dataTransfer.getData('text');
        let pokemonElement = document.querySelector(`#${draggableElementData}`)
        if (event.target.innerText == draggableElementData) {
            console.log('si');
            point++
            event.target.innerHTML = ''
            event.target.appendChild(pokemonElement)
            wrongMsg.innerText = ''

            if(point == CARDS){
                draggableElements.innerHTML = `<p class = "win">Ganaste</p>`
            }
        } else {
            console.log('no');
            wrongMsg.innerText = 'ups'
        }
    });
});
 

   
}
