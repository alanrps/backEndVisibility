const app = require('express')();
const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');
const { createMarker } = require('./src/controllers/markers/create');
const { getMarkers, getPlaceMarkers } = require('./src/controllers/markers/get');
const { schemaCreateMarker } = require('./src/validators/markers/create-marker');
const { verifyJwt } = require('./src/middlewares/auth');
const controllerRanking = require('./src/controllers/ranking');

// ENDPOINTS COM AUTENTICAÇÃO
app
    .post('/markers', [
        verifyJwt,
        createMarker
    ]);
app
    .patch('/users/:id(\\d+)', [
        verifyJwt,
        controllerUsers.updateUser
    ]);
app
    .patch('/users/passwords/:user_id', [
        verifyJwt,
        controllerUsers.updatePassword
    ]);
app
    .get('/users/:id', [
        verifyJwt,
        controllerUsers.searchUserById
    ]);

// ENDPOINTS SEM AUTENTICAÇÃO
app 
    .post('/authenticate', controllerAuthenticate.login);
app
    .get('/markers/:current_position', getMarkers);
app
    .post('/users', controllerUsers.createUser);
app
    .patch('/users/:email', controllerUsers.recoveryPassword);
app
    .get('/ranking', controllerRanking.createRanking);
app
    .get('/markers/places/:marker_id', getPlaceMarkers);
// app
//     .delete('/markers/:id', controllerMarkers.deleteMarker);

// app
//     .route('/markers/:type_marker_id')
//     .post([
//         requestValidator(schemaCreateMarker),
//         controllerMarkers.createMarker,
//     ]);

// app.delete('/users/:id', controllerUsers.deleteUser);

module.exports = app;
