const express = require('express');
const path = require('path');
const smogon = require('./smogon');

const PORT = process.env.PORT || 8090;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'main.js');

const app = express();

app.use('/smogon', smogon);
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
