export default class Ships{
    constructor(){
        this.loadShips()
        this.loadVehicles()
        this.ships = []
        this.vehicles = []
    }

    async loadShips(){
        //"starships":["2","3","5","9","10","11","12","13"],"vehicles":["4","6","7","8"] -- 12db
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/starships?ids=2,3,5,9,10,11,12,13', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let p =  await response.json();
        this.showShips(p)
        this.MakeImagesClickable()
    }

    async loadVehicles(){
        //"vehicles":["4","6","7","8"]
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/vehicles?ids=4,6,7,8', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let p =  await response.json();
        this.showVehicles(p)
        this.MakeImagesClickable()
    }

    async showShips(a) {
        this.ships = a
        
        const ShipIds = [2,3,5,9,10,11,12,13]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-3 m-3">
            <div class="overlay"></div>
            <img src="https://bgs.jedlik.eu/swimages/starships/${ShipIds[id]}.jpg" class="img w-100 h-100 ships" id="${p.name}" style="border: solid yellow 1px;"">
            <p class="text-center text-warning">${p.name}</p>
        </div>
        `
        id++
        })
        imgRow.innerHTML += imgs
    }

    async showVehicles(a) {
        this.vehicles = a
        
        const VehIds = [4,6,7,8]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-3 m-3">
            <div class="overlay"></div>
            <img src="https://bgs.jedlik.eu/swimages/vehicles/${VehIds[id]}.jpg" class="img w-100 h-100 ships vehicles" id="${p.name}" style="border: solid yellow 1px;"">
            <p class="text-center text-warning h6">${p.name}</p>
        </div>
        `
        id++
        })
        imgRow.innerHTML += imgs
    }

    async MakeImagesClickable() {
        let ships = document.querySelectorAll(".ships")
        ships.forEach(s => {
            s.addEventListener("click", (e)=>{
                this.ShowVehicleData(e)
            })
        })
    }

    async ShowVehicleData(e){
        let shiph1 =  document.querySelector("#shipH1")
        let dataDiv = document.querySelector("#dataDiv")
        let pilotId = 0
        let isStarship = true
        shiph1.innerHTML = e.target.id
        shiph1.style = "border-bottom: solid orange 5px;"
        document.querySelector("#dataShowDiv").style = "border: solid orange 5px"
        let theChosenOne;
        if(e.target.classList[4] == "vehicles"){
            this.vehicles.forEach(v => {
                if(v.name == e.target.id){
                    theChosenOne = v;
                    isStarship = false
                }
            })
        } else{
            this.ships.forEach(s => {
                if(s.name == e.target.id){
                    theChosenOne = s;
                }
            })
        }
        let data = ""
        
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

        if(isStarship){
            data += `<p class="text-warning mt-3">Hyperdrive Rating: ${theChosenOne.hyperdrive_rating}</p>`
            data += `<p class="text-warning mt-3">MGLT: ${theChosenOne.MGLT}</p>`
        }

        if(theChosenOne.pilots.length == 0){
            data += `<p class="text-warning mt-3">Pilots: unknown</p>`
        } else{
            data += `<p class="text-warning mt-3">Pilots: ${theChosenOne.pilots}</p>` //itt kell bővíteni
        }

        dataDiv.innerHTML = data
        }  
}