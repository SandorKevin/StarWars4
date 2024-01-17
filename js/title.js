export default class Title{
    constructor(){
        document.body.style.overflow = "hidden"
        this.loadTitle()
    }

    async loadTitle(){
        //this.loadTitleImg()
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/films/1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        let p =  await response.json();
        document.querySelector("#episodeId").innerHTML = `Episode ${p[0].episode_id}`
        document.querySelector("#titleId").innerHTML = p[0].title
        document.querySelector("#opening_crawl").innerHTML = p[0].opening_crawl

        setTimeout(() => {
            this.loadTitleImg()
            document.body.style.overflow = "scroll"
            document.querySelector(".star-wars").innerHTML = ""
            document.querySelector("#relYear").innerHTML = `Release Year: ${p[0].release_date}`
            document.querySelector("#infoDiv").innerHTML = `Director: ${p[0].director}, Producers: ${p[0].producer}`
          }, "60000");  //60000
    }

    loadTitleImg(){
        document.querySelector("#poster").src = "https://bgs.jedlik.eu/swimages/films/1.jpg"
    }
}