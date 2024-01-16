export default class Ships{
    constructor(){
        this.loadShips()
        this.loadVehicles()
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
        const ShipIds = [2,3,5,9,10,11,12,13]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-3 m-3">
            <img src="https://bgs.jedlik.eu/swimages/starships/${ShipIds[id]}.jpg" class="img w-100 h-100 ships" id="${p.name}" style="border: solid yellow 1px;"">
            <p class="text-center text-warning">${p.name}</p>
        </div>
        `
        id++
        })
        imgRow.innerHTML += imgs
    }

    async showVehicles(a) {
        const VehIds = [4,6,7,8]
        let id = 0
        const imgRow = document.querySelector(".imgRow")
        let imgs = ""
        a.forEach(p => {
        imgs += `
        <div class="col-12 col-md-3 m-3">
            <img src="https://bgs.jedlik.eu/swimages/vehicles/${VehIds[id]}.jpg" class="img w-100 h-100 ships" id="${p.name}" style="border: solid yellow 1px;"">
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
        shiph1.innerHTML = e.target.id
        document.querySelector("#shipH1").style = "border-bottom: solid orange 5px;"
        document.querySelector("#dataDiv").style = "border: solid orange 5px"
    }
}