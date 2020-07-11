import aws from 'aws-sdk';
import express from 'express';

import { attributePairsToObject, unique } from './helper';

const router = express.Router();

const METAGAME_DOMAIN = 'smogon-data';
const SHOWDOWN_DOMAIN = 'showdown-data';

var simpleDB = new aws.SimpleDB({
    endpoint: 'https://sdb.amazonaws.com/',
    region: "us-east-1"
});

simpleDB.createDomain({ DomainName: METAGAME_DOMAIN }, (err, data) => {
    if (err) console.log(`Failed to connect to domain: ${JSON.stringify(err)}`)
    else console.log('Connected to Metagame domain successfully')
});

simpleDB.createDomain({ DomainName: SHOWDOWN_DOMAIN }, (err, data) => {
    if (err) console.log(`Failed to connect to domain: ${JSON.stringify(err)}`)
    else console.log('Connected to Showdown domain successfully')
});

/** Metagame Specific Commands */

// Create
router.post('*', (req, res) => {
    let Attributes = [];
    let body = req.body;

    Object.keys(body).forEach((key) => {
        Attributes.push({ Name: key, Value: body[key] });
    });

    let ItemName = `${body.year}_${body.month}_${body.gen}_${body.format}_${body.rank}`;

    let params = Object.assign({}, { Attributes, DomainName: METAGAME_DOMAIN, ItemName });

    simpleDB.putAttributes(params, (err, data) => {
        if (err) res.status(err.statusCode).send(err);
        else res.status(200).send('Created Successfully');
    });
});

// Read
router.get('/count', (req, res) => {
    let { year, month, gen, format, rank } = req.query;
    //console.log(`Year: ${year}\nMonth: ${month}\nGen: ${gen}\nFormat: ${format}\nRank: ${rank}`);
    let SelectExpression =  `select count(*) from \`${METAGAME_DOMAIN}\``;

    // Build expression
    if (!!year) SelectExpression += ` where year = '${year}'`;
    if (!!month) {
        let word = (!!year) ? 'intersection' : 'where';
        SelectExpression += ` ${word} month = '${month}'`;
    }
    if (!!gen) {
        let word = (!!year || !!month) ? 'intersection' : 'where';
        SelectExpression += ` ${word} gen = '${gen}'`;
    }
    if (!!format) {
        let word = (!!year || !!month || !!gen) ? 'intersection' : 'where';
        SelectExpression += ` ${word} format = '${format}'`;
    }
    if (!!rank) {
        let word = (!!year || !!month || !!gen || !!format) ? 'intersection' : 'where';
        SelectExpression += ` ${word} rank = '${rank}'`;
    }

    simpleDB.select({ SelectExpression }, (err, awsResp) => {
        if (err) {
            res.status(err.statusCode).send(err);
        } else {
            res.send(awsResp);
        }
    });
});

/** Get Proper Data for a metagame */
router.get('/:year/:month/:gen/:format/:rank', (req, res) => {
    let { year, month, gen, format, rank } = req.params;
    let metagameId = `${year}_${month}_${gen}_${format}_${rank}`;
    let SelectExpression = `select * from \`${SHOWDOWN_DOMAIN}\` where metagameId = '${metagameId}'`;
    let dbQuery = simpleDB.select({ SelectExpression }).promise();

    dbQuery.then(awsResp => {
        res.send(awsResp);
    }).catch(err => {
        res.status(err.statusCode).send(err);
    });
});

router.get('/:year/:month/:gen/:format', (req, res) => {
    let { year, month, gen, format } = req.params;
    let SelectExpression = `select rank from \`${METAGAME_DOMAIN}\` where year = '${year}' intersection month = '${month}' intersection gen = '${gen}' intersection format = '${format}'`;
    let dbQuery = simpleDB.select({ SelectExpression }).promise();

    dbQuery.then(awsResp => {
        res.send(awsResp.Items.map(i => i.Attributes[0].Value).filter(unique));
    }).catch(err => {
        res.status(err.statusCode).send(err);
    });
});

router.get('/:year/:month/:gen', (req, res) => {
    let { year, month, gen } = req.params;
    let SelectExpression = `select format from \`${METAGAME_DOMAIN}\` where year = '${year}' intersection month = '${month}' intersection gen = '${gen}'`;
    let dbQuery = simpleDB.select({ SelectExpression }).promise();

    dbQuery.then(awsResp => {
        res.send(awsResp.Items.map(i => i.Attributes[0].Value).filter(unique));
    }).catch(err => {
        res.status(err.statusCode).send(err);
    });
});

router.get('/:year/:month', (req, res) => {
    let { year, month } = req.params;
    let SelectExpression = `select gen from \`${METAGAME_DOMAIN}\` where year = '${year}' intersection month = '${month}'`;
    let dbQuery = simpleDB.select({ SelectExpression }).promise();

    dbQuery.then(awsResp => {
        res.send(awsResp.Items.map(i => i.Attributes[0].Value).filter(unique));
    }).catch(err => {
        res.status(err.statusCode).send(err);
    });
});

router.get('/:ItemName', (req, res) => {
    const { ItemName } = req.params;
    let item = {}
    simpleDB.getAttributes({ DomainName: METAGAME_DOMAIN, ItemName }, (err, awsResp) => {
        if (err) {
            res.status(err.statusCode).send(err);
        } else {
            item = Object.assign({}, { id: ItemName }, attributePairsToObject(awsResp.Attributes));
            res.status(200).send(item);
        }
    });
});

// List
router.get('*', (req, res) => {
    let { year, month, gen, format, rank, limit } = req.query;
    //console.log(`Year: ${year}\nMonth: ${month}\nGen: ${gen}\nFormat: ${format}\nRank: ${rank}`);
    let SelectExpression =  `select * from \`${METAGAME_DOMAIN}\``;
    if (!limit) limit = 100;

    // Build expression
    if (!!year) SelectExpression += ` where year = '${year}'`;
    if (!!month)
    {
        let word = (!!year) ? 'intersection' : 'where';
        SelectExpression += ` ${word} month = '${month}'`;
    }
    if (!!gen) {
        let word = (!!year || !!month) ? 'intersection' : 'where';
        SelectExpression += ` ${word} gen = '${gen}'`;
    }
    if (!!format) {
        let word = (!!year || !!month || !!gen) ? 'intersection' : 'where';
        SelectExpression += ` ${word} format = '${format}'`;
    }
    if (!!rank) {
        let word = (!!year || !!month || !!gen || !!format) ? 'intersection' : 'where';
        SelectExpression += ` ${word} rank = '${rank}'`;
    }

    SelectExpression += ` limit ${limit}`;
    // console.log(SelectExpression);

    simpleDB.select({ SelectExpression }, (err, awsResp) => {
        let items = [];
        if (err) {
            res.status(err.statusCode).send(err);
        } else {
            items = awsResp.Items.map((item) => {
                // console.log(item);
                let output = Object.assign({}, attributePairsToObject(item.Attributes));
                output.id = item.Name;
                return output;
            });
            res.status(200).send(items);
        }
    });
});

export default router;