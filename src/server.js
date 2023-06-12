const express = require('express');
const bodyParser = require('body-parser');
const { crawler } = require('./crawler.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const host = '127.0.0.1';
const port = 3000;
const route = '/parse';

const listener = async (req, res) => {
    const domain = req.body.domainName;
    const data = await crawler(domain);
    res.send(data);
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
