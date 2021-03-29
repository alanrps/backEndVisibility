const router = require('express').Router();
const knex = require('./database');

const authMiddleware = require('./src/middlewares/auth');

const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');
const { request } = require('express');

const auth = authMiddleware.verifyJwt;

router.post('/user', controllerUsers.createUser);
router.post('/authenticate', controllerAuthenticate.login);

router.delete('/users/:id', controllerUsers.deleteUser);
router.patch('/users/:id', controllerUsers.updateUser);

router.post('/markers/:type_marker_id', controllerMarkers.createMarker);
router.delete('/markers/:id', controllerMarkers.deleteMarker);

router.post('/test', (resquest, response) => {
    const users = [{
        name: 'alan',
        phone_number: '44 998083017',
        email: 'teste@gmail.com',
        password: '123456',
        birth_date: '1998-11-24',
        genre: 'MALE'
    },
    {
        name: 'judas',
        phone_number: '44 998083017',
        email: 'teste1@gmail.com',
        password: '123456',
        birth_date: '1998-11-24',
        genre: 'MALE'
    }];

    knex('users')
        .insert(users)
        .returning(['id', 'name'])
        .then((retorno) => console.log(retorno));
})

module.exports = router;