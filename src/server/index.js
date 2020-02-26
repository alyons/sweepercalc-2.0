import path from 'path';
import express from 'express';

import smogon from './smogon';

const PORT = process.env.PORT || 8090; // eslint-disable-line no-undef
const DIST_DIR = __dirname; // eslint-disable-line no-undef
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();

app.use(express.static(DIST_DIR));
app.use('/smogon', smogon);

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`); // eslint-disable-line no-undef
    console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-undef
});
