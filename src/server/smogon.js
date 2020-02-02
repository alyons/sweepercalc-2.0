const express = require('express');
const request = require('request-promise-native');
const router = express.Router();

router.get('/:year/:month/:gen/:meta/:rank', (req, res) => {
    const { year, month, gen, meta, rank } = req.params;
    const options = {
        uri: `https://www.smogon.com/stats/${year}-${month}/chaos/gen${gen}${meta}-${rank}.json`,
        json: true
    };
    request(options)
        .then(response => { res.send(response); })
        .catch(error => { res.status(400).send(error); });
});

module.exports = router;
