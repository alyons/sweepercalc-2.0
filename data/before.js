function before(app, server, compiler) {
    app.get('/years.json', function(req, res) {
        res.json([2019])
    });
    
    app.get('/2019/months.json', function(req, res) {
        res.json([12])
    });

    app.get('/2019/12/generations.json', function(req, res) {
        res.json([8])
    });

    app.get('/2019/12/8/metagames.json', function(req, res) {
        res.json(["ou"])
    });

    app.get('/2019/12/8/ou/ranks.json', function(req, res) {
        res.json([1825])
    });
}

module.exports = before;
