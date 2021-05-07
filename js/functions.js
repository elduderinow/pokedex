let pokeMonArr = [];
let pokeEvoArr = [];
let movesArr = [];
let pName = document.getElementById("pokename");
let pImg = document.getElementById("mainimg");
let pId = document.getElementById("poke-id");
let pMov = document.getElementById("moves");
let pTyp = document.getElementById("poke-type");
let pTxt = document.getElementById("poke-text");
let pHP = document.getElementById("poke-HP");
let pAtk = document.getElementById("poke-Atk");
let pabil1 = document.getElementById("pabil1");
let pabil2 = document.getElementById("pabil2");
let evoName = document.getElementById("evolveName");
let evoImg = document.getElementById("evolvesprite1");
let evols = document.getElementById("evolution-list");


//Callback func to get json api based in input
const getData = async (pokeInput, pokRes) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}`);
    const result = await data.json();

    const evoDat = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeInput}`);
    const evoRes = await evoDat.json();

    const evol = await fetch(evoRes.evolution_chain.url);
    const evolRes = await evol.json();

    //combine the two result with spread object.
    let combine = {...result, ...evoRes};
    pokRes(combine);

    //run the changepok func
    changePok(combine, result);

    //Get the evolution chain function to get all the evolutions of 1 instance, planning to implement this.
    //getEvol(evolRes);

};

//Callback func to get json api based in input for the evolution.
const getEvolution = async (evolution, evolz) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`);
    const evolSprite = await data.json();
    evolz(evolSprite);
};

//event handlers
document.getElementById("run").addEventListener('click', function () {
    activate();
});

//event handler by pressing enter, because it feels more naturally after typing.  (not working yet)
document.getElementById("run").addEventListener('keypress', function () {
    if (e.key === 13) {
        activate();
    }

});

//activate func gets activated after event handlers. It will first clear the  abilities list so a nex append can happen.
//The moves arr also gets cleared.
function activate() {
    pMov.innerHTML = "";
    movesArr = [];
    //pokeEvoArr = [];

    //getting the value from user input
    let value = document.getElementById("poke-input").value;
    let poke = `${value}`;

    //a little easter egg. if not, fire the real pokedex func.
    if (value === "hot marijke" || value === "6969") {
        hotM();
    }
    if (value != "hot marijke" || value != "6969") {
        getData(poke, (pokRes) => {
            pokeMonArr.push(pokRes);
        });
    }
}


function changePok(pok) {
    //Get the abilities, and image info from the api.
    let moves = pok.moves;
    let pokoimg = pok.sprites.front_default;

    //generate a random number based on the moves object, minus 4 because we need to use that number as a starting point in the for loop and end with an extra 4 moves. Otherwise te result can be more than the moves.length, which will result an error.
    let randNr = Math.floor(Math.random() * moves.length - 4);
    // Itterate through 4 random moves and display it on the pokedex.
    for (i = randNr; i < randNr + 4; i++) {
        movesArr.push(moves[i].move.name);
    }

    //changing the DOM elements according to the right value.
    pImg.setAttribute("src", `${pokoimg}`);
    pName.innerHTML = pok.name;
    pId.innerHTML = "ID: " + pok.id;
    pTyp.innerHTML = pok.types[0].type.name;
    for (let i = 0; i < 4; i++) {
        let movez = movesArr;
        let li = document.createElement('li')
        li.innerHTML = movez[i];
        pMov.appendChild(li);
    }
    pHP.innerHTML = pok.stats[0].base_stat + " HP";
    pAtk.innerHTML = pok.stats[1].base_stat + " Attack";
    pTxt.innerHTML = pok.flavor_text_entries[0].flavor_text;
    pabil1.innerHTML = pok.abilities[0].ability.name;
    pabil2.innerHTML = pok.abilities[1].ability.name;

    console.log(pok);
    console.log(pok.evolves_from_species);


    //check if there are any evolutions, if yes, display them, else clear the text field.
    if (pok.evolves_from_species === null) {
        evoName.style.fontSize="9px";
        evoName.style.paddingTop="22px";
        evoName.innerHTML = "Not evolved yet.<br>Take a walk on the wild side.";
        evoImg.style.display="none";
    } else {
        let evolvename = pok.evolves_from_species.name;
        getEvolution(evolvename, (pokRes) => {
            evoName.style.textTransform="capitalize"
            evoName.style.fontSize="10px";
            evoName.style.paddingTop="0px";
            evoImg.style.display="inline-block";
            let evoname = pokRes.name;
            let evoimage = pokRes.sprites.front_default;
            evoName.innerHTML =`Previous form: ${evoname}`;
            evoImg.setAttribute('src', evoimage)
        });
    }




}

/*
function getEvol(evolpok) {
    pokeEvoArr.push(evolpok.chain.species.name);
    pokeEvoArr.push(evolpok.chain.evolves_to[0].species.name);
    pokeEvoArr.push(evolpok.chain.evolves_to[0].evolves_to[0].species.name);
    pokeEvoArr.push(evolpok.chain.evolves_to[0].evolves_to[1].species.name);
    pokeEvoArr.push(evolpok.chain.evolves_to[0].evolves_to[2].species.name);
}*/


function hotM() {
    pTyp.innerHTML = "Water";
    pName.innerHTML = "Hot Marijke";
    pTxt.innerHTML = "veel liefs";
    pId.innerHTML = "ID: 69";
    pImg.setAttribute("src", "https://images0.persgroep.net/rcs/M6jWO-WNyEWBnR7H-U4Nwast4c4/diocontent/18412256/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8");
    for (let i = 0; i < 4; i++) {
        let movez = ["Verwennen", "Masseren", "Happy Ending", "Or very bad ending"]
        let li = document.createElement('li')
        li.innerHTML = movez[i];
        pMov.appendChild(li);
    }
}
