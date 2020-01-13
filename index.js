const request = require('request-promise-native');
const data = require('./gen8ou-1825.json');

let pokemonNames = Array.from(Object.keys(data.data));
let pokemonData = [];
pokemonNames.forEach(name => {
    let item = Object.assign({}, data.data[name], { name });
    pokemonData.push(item);
});

const usageComparison = (a, b) => b.usage - a.usage;
pokemonData.sort(usageComparison);
console.table(pokemonData);

// Get all time periods for data for Smogon
// let timePeriods = [];
// let timeRegex = /[0-9]{4}-[0-9]{2}/g;
// request('https://www.smogon.com/stats/')
//     .then(response => {
//         response.match(timeRegex).forEach(match => {
//             if (timePeriods.indexOf(match) === -1) timePeriods.push(match);
//         });
//         console.log(timePeriods);
//     }).catch(error => {
//         console.error(error);
//     });

// Get all meta game data for a given time period
// let metaGames = [];
// let metaRegex = />(gen.*\.json)</g;
// request('https://www.smogon.com/stats/2019-12/chaos/')
//     .then(response => {
//         Array.from(response.matchAll(metaRegex)).forEach(match => {
//             if (metaGames.indexOf(match[1]) === -1) metaGames.push(match[1]);
//         });
//         console.log(metaGames);
//     }).catch(error => {
//         console.error(error);
//     });

// Get Metagame's data
// request('https://www.smogon.com/stats/2019-12/chaos/gen8ou-1825.json')
//     .then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.error(error);
//     });


