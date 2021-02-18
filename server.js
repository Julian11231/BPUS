const express = require('express');
const app = express();

app.use(express.static('./dist/bpus'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/bpus/'}),
);

app.listen(process.env.PORT || 8080);