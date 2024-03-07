document.body.style.overflow = "hidden scroll"

let characters = ""
loadcharacters()

async function loadcharacters(){
    //["1","2","3","4","5","6","7","8","9","10","12","13","14","15","16","18","19","81"]
    const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/people?ids=1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,18,19,81', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    });
    let p =  await response.json();
    showcharacters(p)
    MakeImagesClickable()
}

async function showcharacters(a) {
    characters = a
    const CharacterIds = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,18,19,81]
    let id = 0
    const imgRow = document.querySelector(".imgRow")
    let imgs = ""
    a.forEach(p => {
    imgs += `
    <div class="col-12 col-md-12 col-lg-2 m-3">
        <img src="https://bgs.jedlik.eu/swimages/characters/${CharacterIds[id]}.jpg" class="img w-100 h-100" id="${p.name}" style="border: solid yellow 1px;"">
        <p class="text-center text-warning">${p.name}</p>
    </div>
    `
    id++
    })
    imgRow.innerHTML += imgs
}

function MakeImagesClickable() {
    let img = document.querySelectorAll(".img")
    img.forEach(s => {
        s.addEventListener("click", (e)=>{
            showFilms(e)
            document.querySelector("#dataDiv").scrollIntoView()
        })
    })
}

async function showFilms(e){
    let characterH1 =  document.querySelector("#characterH1")
    let FilmRow = document.querySelector(".FilmRow")
    let imgWidth = 100
    characterH1.innerHTML = e.target.id
    characterH1.style = "border-bottom: solid orange 5px;"
    document.querySelector("#dataShowDiv").style = "border: solid orange 5px"
    let theChosenChar;

    characters.forEach(p=>{
        if(p.name == e.target.id) theChosenChar = p;
    })

    const response = await fetch(`https://bgs.jedlik.eu/swapi/api/group/films?ids=${theChosenChar.films}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let films = await response.json();

    if(films.length == 1){
        imgWidth = 25
    }

    let data = ""

    console.log(films);
    
    for (let id = 0; id < films.length; id++) {
        data += `
        <div class="col-lg-12 col-xl-2">
        <img src="https://bgs.jedlik.eu/swimages/films/${films[id].id}.jpg" class=" w-100 h-100 p-3" title="${films[id].title}">
        </a>
        </div>`
    }

    FilmRow.innerHTML = data
}