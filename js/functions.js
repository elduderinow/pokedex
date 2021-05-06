let pokeMonArr = [];
let pokeEvoArr = [];
let movesArr = [];
let pName = document.getElementById("pokename");
let pImg = Array.from(document.querySelectorAll("img.pimg"));
let pId = document.getElementById("poke-id");
let pMov = document.getElementById("moves");
let pTyp = document.getElementById("poke-type");
let pTxt = document.getElementById("poke-text");
let pHP = document.getElementById("poke-HP");
let pAtk = document.getElementById("poke-Atk");


//Callback func to get json api based in input
const getData = async (pokeInput, pokRes) => {
    const data = await fetch(`https://pokeapi.co/api/v2/${pokeInput}`);
    const result = await data.json();

    const evoDat = await fetch(result.species.url);
    const evoRes = await evoDat.json();

    const evol = await fetch(evoRes.evolution_chain.url);
    const evolRes = await evol.json();

    pokeEvoArr.push(evolRes);
    //combine the two result with spread object.
    let combine = {...result, ...evoRes};
    pokRes(combine);
    changePok(combine);


};

//Callback func to get json api based in input
document.getElementById("run").addEventListener('click', function () {
    activate();
});

document.getElementById("run").addEventListener('keypress', function () {
    if (e.key === 13) {
        activate();
    }

});

function activate(){
    pMov.innerHTML = "";
    movesArr = [];
    pokeEvoArr = [];
    let value = document.getElementById("poke-input").value;
    let poke = `pokemon/${value}`;

    if (value === "hot marijke" || value === "6969") {
        hotM();
    } if (value!= "hot marijke" || value != "6969") {
        getData(poke, (pokRes) => {
            pokeMonArr.push(pokRes);
        });
    }
}

function changePok(pok) {
    console.log(movesArr);
    console.log(pok);
    let moves = pok.moves;
    let pokoimg = pok.sprites.front_default;

    //generate a random number based on the moves object, minus 4 because we need to use that number as a starting point in the for loop and end with an extra 4 moves. Otherwise te result can be more than the moves.length, which will result an error.
    let randNr = Math.floor(Math.random() * moves.length - 4);
    // Itterate through 4 random moves and display it on the pokedex.
    for (i = randNr; i < randNr + 4; i++) {
        movesArr.push(moves[i].move.name);
    }

    pImg.forEach((elem) => elem.setAttribute("src", `${pokoimg}`));
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

    //console.log(pokeEvoArr[0].chain.evolves_to[0].species.name);
    //console.log(pokeEvoArr[0].chain.evolves_to[0].evolves_to[0].species.name);
    //console.log(pokeEvoArr[0].chain.evolves_to[0].evolves_to[1].species.name);
    //console.log(pokeEvoArr[0].chain.evolves_to[0].evolves_to[2].species.name);
    console.log(pokeMonArr);

}

function hotM() {
    pTyp.innerHTML = "Water";
    pName.innerHTML="Hot Marijke";
    pTxt.innerHTML ="veel liefs";
    pId.innerHTML = "ID: 69";
    pImg.forEach((elem) => elem.setAttribute("src", `https://images0.persgroep.net/rcs/M6jWO-WNyEWBnR7H-U4Nwast4c4/diocontent/18412256/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8`));

    for (let i = 0; i < 4; i++) {
        let movez = ["Verwennen", "Masseren" , "Happy Ending", "Or very bad ending"]
        let li = document.createElement('li')
        li.innerHTML = movez[i];
        pMov.appendChild(li);
    }
}
