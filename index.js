const api = require('express')();
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');

const { PORT } = process.env;

api.use(json());
api.use(cors());
api.use(routes);
api.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Back-end execute in ${PORT}`);
