document.body.style.overflow = "hidden scroll"
let planets = ""
loadPlanets()

async function loadPlanets(){
    const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/planets?ids=1,2,3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    });
    let p =  await response.json();
    showPlanets(p)
    MakeImagesClickable()
}

async function showPlanets(a) {
    planets = a
    const PlanetIds = [1,2,3]
    let id = 0
    const imgRow = document.querySelector(".imgRow")
    let imgs = ""
    a.forEach(p => {
    imgs += `
    <div class="col-12 col-md-12 col-lg-3 m-3">
        <img src="https://bgs.jedlik.eu/swimages/planets/${PlanetIds[id]}.jpg" class="img w-100 h-100" id="${p.name}" style="border: solid yellow 1px;"">
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
    let planeth1 =  document.querySelector("#planetH1")
    let planetsRow = document.querySelector(".planetsRow")
    let imgWidth = 100
    planeth1.innerHTML = e.target.id
    planeth1.style = "border-bottom: solid orange 5px;"
    document.querySelector("#dataShowDiv").style = "border: solid orange 5px"
    let theChosenPlanet;

    planets.forEach(p=>{
        if(p.name == e.target.id) theChosenPlanet = p;
    })

    const response = await fetch(`https://bgs.jedlik.eu/swapi/api/group/films?ids=${theChosenPlanet.films}`, {
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

    planetsRow.innerHTML = data
}