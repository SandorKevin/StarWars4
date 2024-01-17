export default class ByPlanet{
    constructor() {
        document.body.style.overflow = "scroll"
        this.showSelect().then(() => { this.listUnivercities() });
        document.querySelector('.btn').addEventListener('click', this.listUnivercities.bind(this));
    }
    

    async showSelect() {
        const formSelect = document.querySelector('.form-select');
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/planets');
        let planets = await response.json();
        const planetGroups = Object.groupBy(planets, ({ film }) => film);
        let selectList = [];
        Object.entries(planetGroups).forEach(entry => {
            const [key, value] = entry;
            //console.log(key, value.length);
            selectList.push({ name: key, count: value.length })
        });
    }

    async listUnivercities() {
        const selectedPlanet = document.querySelector('.form-select').value;
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/group/planets?ids=' + selectedPlanet);
        const planets = await response.json();
        const table = document.querySelector('.table tbody');
        let tr = '';
        planets.forEach(u => {
            tr += `
                <tr>
                <td>${u.name}</td>
                <td>`;
            u.domains.forEach(d => {
                tr += `${d}<br/>`
            })
            tr += `</td>
                <td>`;
            u.web_pages.forEach(wp => {
                tr += `<a href="${wp}" target="_blank"/>${wp}</a><br/>`
            })
            tr += `</td>
                <td>${u.country} (${u.alpha_two_code})</td>
                <td>`;

            if (u.state_province == null) {
                tr += '-'
            } else {
                tr += `${u.state_province}`
            }

            tr += `</td>
                </tr>
            `
        });
        table.innerHTML = tr;
    }
}