const express = require('express');
const bodyParser = require('body-parser');
const { crowler } = require('./crowler.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const host = 'localhost';
const port = 3000;
const route = '/parse';

const listener = (req, res) => {
    const domain = req.body.domainName;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = crowler(domain);
    res.end(JSON.stringify(data));
};

const server = app.listen(port, host, function () {
    console.log(`Server is running on http://${host}:${port}`);
});

app.post(route, listener);

/*
    TODO: краулер страницы
    POST http://localhost:3000/parse
    body: { domainName: string}
    return string[]
*/
