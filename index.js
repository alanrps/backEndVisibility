const api = require('express')();
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = 3000;

api.use(json());
api.use(cors());
api.use(routes);
api.listen(port);

// eslint-disable-next-line no-console
console.log(`Back-end execute in ${port}`);
