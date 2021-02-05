const api = require('express')();
const { json } = require('express');
const routes = require('./routes');
const cors = require('cors');
const port = 3000;


api.use(json());
api.use(cors());
api.use(routes);
api.listen(port);
console.log(`Back-end execute in ${port}`)