const request = require('request-promise-native');
// const data = require('./gen8ou-1825.json');

// let pokemonNames = Array.from(Object.keys(data.data));
// let pokemonData = [];
// pokemonNames.forEach(name => {
//     let item = Object.assign({}, data.data[name], { name });
//     pokemonData.push(item);
// });

// const usageComparison = (a, b) => b.usage - a.usage;
// pokemonData.sort(usageComparison);
// console.table(pokemonData);

let dataList = [];

// Get all time periods for data for Smogon
let timePeriods = [];
let timeRegex = /[0-9]{4}-[0-9]{2}/g;


let timeResponse = await request('https://www.smogon.com/stats/').catch((err) => { console.error(error); });
if (timeResponse != undefined) 







    .then(response => {
        response.match(timeRegex).forEach(match => {
            if (timePeriods.indexOf(match) === -1) timePeriods.push(match);
        });
    }).then(() => {
        return request()
    })

// Get all meta game data for a given time period

timePeriods.forEach(t => {
    request(`https://www.smogon.com/stats/${t}/chaos/`)
        .then(response => {
            Array.from(response.matchAll(metaRegex)).forEach(match => {
                dataList.push(`https://www.smogon.com/stats/${t}/chaos/${match}`);
            });
        }).catch(error => {
            console.error(error);
        });
});

console.log(dataList);

// Get Metagame's data
// request('https://www.smogon.com/stats/2019-12/chaos/gen8ou-1825.json')
//     .then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.error(error);
//     });


