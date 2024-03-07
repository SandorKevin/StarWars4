//Méri Levente

document.body.style.overflow = "hidden scroll"
loadShips()
loadVehicles()
let ships = []
let vehicles = []

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function loadShips(){
        //"starships":["2","3","5","9","10","11","12","13"],"vehicles":["4","6","7","8"] -- 12db
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/starships?ids=2,3,5,9,10,11,12,13', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let p =  await response.json();
        showShips(p)
        MakeImagesClickable()
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function loadVehicles(){
        //"vehicles":["4","6","7","8"]
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/vehicles?ids=4,6,7,8', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let p =  await response.json();
        showVehicles(p)
        MakeImagesClickable()
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function showShips(a) {
        ships = a
        
        const ShipIds = [2,3,5,9,10,11,12,13]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-12 col-lg-3 m-3">
            <img src="https://bgs.jedlik.eu/swimages/starships/${ShipIds[id]}.jpg" class="img w-100 h-100 ships" id="${p.name}" style="border: solid yellow 1px;"">
            <p class="text-center text-warning">${p.name}</p>
        </div>
        `
        id++
        })
        imgRow.innerHTML += imgs
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function showVehicles(a) {
        vehicles = a
        
        const VehIds = [4,6,7,8]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-12 col-lg-3 m-3">
            <img src="https://bgs.jedlik.eu/swimages/vehicles/${VehIds[id]}.jpg" class="img w-100 h-100 ships vehicles" id="${p.name}" style="border: solid yellow 1px;"">
            <p class="text-center text-warning h6">${p.name}</p>
        </div>
        `
        id++
        })
        imgRow.innerHTML += imgs
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function MakeImagesClickable() {
        let ships = document.querySelectorAll(".ships")
        ships.forEach(s => {
            s.addEventListener("click", (e)=>{
                ShowVehicleData(e)
                document.querySelector("#dataDiv").scrollIntoView()
            })
        })
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function ShowVehicleData(e){
        document.querySelector(".pilotsRow").innerHTML = ""
        let shiph1 =  document.querySelector("#shipH1")
        let dataDiv = document.querySelector("#dataDiv")
        let isStarship = true
        shiph1.innerHTML = e.target.id
        shiph1.style = "border-bottom: solid orange 5px;"
        document.querySelector("#dataShowDiv").style = "border: solid orange 5px"
        let theChosenOne;

        if(e.target.classList[4] == "vehicles"){
            vehicles.forEach(v => {
                if(v.name == e.target.id){
                    theChosenOne = v;
                    isStarship = false
                }
            })
        } else{
            ships.forEach(s => {
                if(s.name == e.target.id){
                    theChosenOne = s;
                }
            })
        }

        const response = await fetch(`https://bgs.jedlik.eu/swapi/api/group/films?ids=${theChosenOne.films}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let films = await response.json();

        let data = ""
        let filmsData = ""
        
        if(isStarship){
            data += `<h1 class="text-center text-warning">Starship</h1>`
            data += `<p class="text-warning mt-3">Class: ${theChosenOne.starship_class}</p>`
        } else{
            data += `<h1 class="text-center text-warning">Vehicle</h1>`
            data += `<p class="text-warning mt-3">Class: ${theChosenOne.vehicle_class}</p>`
        }
        data += `<p class="text-warning mt-3">Modell: ${theChosenOne.model}</p>`
        data += `<p class="text-warning mt-3">Manufacturer: ${theChosenOne.manufacturer}</p>`
        data += `<p class="text-warning mt-3">Cost in Credit: ${theChosenOne.cost_in_credits}</p>`
        data += `<p class="text-warning mt-3">Lenght: ${theChosenOne.length} m</p>`
        data += `<p class="text-warning mt-3">Max atmosphering speed: ${theChosenOne.max_atmosphering_speed}</p>`
        data += `<p class="text-warning mt-3">Crew: ${theChosenOne.crew}</p>`
        data += `<p class="text-warning mt-3">Passengers: ${theChosenOne.passengers}</p>`
        data += `<p class="text-warning mt-3">Cargo capacity: ${theChosenOne.cargo_capacity}</p>`
        data += `<p class="text-warning mt-3">Consumables: ${theChosenOne.consumables}</p>`
        
        films.forEach(f =>{
            filmsData += `${f.title}, `
        })

        data += `<p class="text-warning mt-3">Filmek: ${filmsData.slice(0, -2)}</p>`

        if(isStarship){
            data += `<p class="text-warning mt-3">Hyperdrive Rating: ${theChosenOne.hyperdrive_rating}</p>`
            data += `<p class="text-warning mt-3">MGLT: ${theChosenOne.MGLT}</p>`
           
        }

        if(theChosenOne.pilots.length == 0){
            data += `<p class="text-warning mt-3">Pilots: unknown</p>`
        } else{
            data += `<p class="text-warning mt-3 mb-0">Pilots:</p>`
            data += showPilots(theChosenOne.pilots)
        }

        dataDiv.innerHTML = data
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function showPilots(pilotIdList){
        const pilotRow = document.querySelector(".pilotsRow")
        pilotRow.innerHTML = ""

        let pilotsData = ""
        let pilotIds = ""
        let imgWidth = 100
 
        pilotIdList.forEach(id=>{
            pilotIds += `${id},`
        })
        pilotIds.slice(0, pilotIds.length-1)

        const response = await fetch(`https://bgs.jedlik.eu/swapi/api/group/people?ids=${pilotIds}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let pilots =  await response.json();
        

        if(pilotIdList.length == 1){
            imgWidth = 25
        }

        for (let id = 0; id < pilots.length; id++) {
            pilotsData += `
            <div class="col-${12 / pilotIdList.length}">
            <a href="characters.html">
            <img src="https://bgs.jedlik.eu/swimages/characters/${pilotIdList[id]}.jpg" class=" w-${imgWidth} h-100" title="${pilots[id].name}">
            </a>
            </div>`
        }
        document.querySelector(".pilotsRow").innerHTML = pilotsData
    }
