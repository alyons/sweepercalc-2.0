import aws from 'aws-sdk';
import express from 'express';

const router = express.Router();

var simpleDB = new aws.SimpleDB();

simpleDB.createDomain({ DomainName: 'smogon-data' }, (err, data) => {
    if (err) console.log(`Failed to connect to domain: ${JSON.stringify(err)}`)
    else console.log('Connected domain successfully')
});

