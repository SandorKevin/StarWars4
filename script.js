//https://bgs.jedlik.eu/swapi/api/films/1

import Title from "./js/title.js";
import ByPlanet from "./js/planets.js";

// default url
const BASE_URL = '/Web/StarWars4';
// oldalak helye:
const rootDiv = document.querySelector('#main');
// nav-ok:
const navs = document.querySelectorAll('a[data-href]');
// console.log(navs);

//route-ok
const routes = {
    '/'         : {html : './pages/home.html', code : Title},
    '/planets' : {html : "./pages/planets.html", code: ByPlanet},
    '/characters' : {html : "./pages/characters.html", code: null},
    '/ships' : {html : "./pages/ships.html", code: null},
    '/404' : {html : './pages/404.html', code : null}
}

// oldalak betöltése
const loadPage = async (page)=>{
    const response = await fetch(page.html);
    const resHTML = response.text(); // szöveggé konvertálás
    return resHTML;
}

// dinamikus osztály példányosítás
const dynamicClass = (page) => {
    if (page.code != null){
        const dynamicClassName = eval(page.code);
        new dynamicClassName();
    }
}

// function onNavClick(){
// }
const onNavClick = async (event)=>{
    event.preventDefault(); // megakadályozza az oldal újratöltését
    // console.log(event.target.dataset.href);
    const pathName = event.target.dataset.href;
    const data = await loadPage(routes[pathName]);
    rootDiv.innerHTML = data;
    window.history.pushState({},'',window.location.origin + BASE_URL + pathName);
    //console.log(window.location);
    dynamicClass(routes[pathName]);
}

// windows.history alapján frissítés
window.addEventListener('popstate',async ()=>{
    // console.log(window.location.pathname);
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    // console.log(routePath);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;
    
    dynamicClass(routes[routePath]);
});

// F5 frissítés
window.addEventListener('load', async ()=>{
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;

    dynamicClass(routes[routePath]);
})

// eseménykezelés
navs.forEach(nav =>{
    nav.addEventListener('click',onNavClick);
})

