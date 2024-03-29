// Méri Levente

document.body.style.overflow = "hidden"


async function loadTitle(){
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
            loadTitleImg()
            document.body.style.overflow = "hidden scroll"
            document.querySelector(".star-wars").innerHTML = ""
            document.querySelector("#filmtitle").innerHTML = `${p[0].title}`
            document.querySelector("#relYear").innerHTML = `Release Year: ${p[0].release_date}`
            document.querySelector("#infoDiv").innerHTML = `Director: ${p[0].director}, Producers: ${p[0].producer}`
          }, "60000");  //60000
    }

function loadTitleImg(){
    document.querySelector("#poster").src = "https://bgs.jedlik.eu/swimages/films/1.jpg"
}

loadTitle()