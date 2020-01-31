const fs = require('fs');
const request = require('request-promise-native');

const SMOGON_URL = 'https://www.smogon.com/stats';
const TIME_REGEX = /[0-9]{4}-[0-9]{2}/g;
const META_REGEX = />(.*)-([0-9]*)\.json/g;

let dataObject = {};

function parseMetagame(metagame) {
    let gen = '6', format = 'notameta', rank = '0';
    let result = /(.*)-([0-9]*)\.json/.exec(metagame);

    if (result[1].includes('1v1')) {
        gen = result[1].split('1v1')[0].substring(3);
        format = '1v1';
    } else if (result[1].includes('350cup')) {
        if (result[1].includes('gen')) gen = result[1].split('1v1')[0].substring(3);
        format = '350cup';
    } else if (result[1].search(/[0-9]+/) > -1) {
        gen = result[1].match(/[0-9]+/)[0];
        format = result[1].split(/[0-9]+/)[1];
    } else {
        format = result[1];
    }

    rank = result[2] || '0';

    if (gen === undefined || format === undefined) console.log(`Failed to parse ${metagame}: [${gen} ,${format}]`)
    
    return [gen, format, rank];
}

request(SMOGON_URL)
    .then(timeResponse => {
        let timePeriods = [];
        timeResponse.match(TIME_REGEX).forEach(match => {
            if (timePeriods.indexOf(match) === -1) timePeriods.push(match);
            let [year, month] = match.split('-');
            if (dataObject[year] === undefined) dataObject[year] = {};
            if (dataObject[year][month] === undefined) dataObject[year][month] = {};
        });
        return timePeriods;
    }).then(timePeriods => {
        return Promise.all(timePeriods.map(t => request(`${SMOGON_URL}/${t}/chaos`)));
    }).then(metaResponses => {
        metaResponses.forEach(metaList => {
            let [year, month] = metaList.match(TIME_REGEX)[0].split('-');
            let metagames = metaList.match(META_REGEX);
            metagames.forEach(value => {
                let item = value.substring(1);
                try {
                    let [gen, format, rank] = parseMetagame(item);
                    if (dataObject[year][month][gen] === undefined) dataObject[year][month][gen] = {};
                    if (dataObject[year][month][gen][format] === undefined) dataObject[year][month][gen][format] = {};
                    dataObject[year][month][gen][format][rank] = item;
                } catch (err) {
                    console.log(`Error found with: ${item} in ${year}/${month}`);
                    throw err;
                }
                });
        });
        return JSON.stringify(dataObject);
    }).then(data => {
        fs.writeFileSync('metagames.json', data);
    }).then(() => {
        console.log('Mission Complete!');
    }).catch(err => {
        console.error(err);
    });