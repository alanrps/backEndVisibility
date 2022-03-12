const app = require('express')();
const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');
const { createMarker } = require('./src/controllers/markers/create');
const { getMarkers, getPlaceMarkers } = require('./src/controllers/markers/get');
const { schemaCreateMarker } = require('./src/validators/markers/create-marker');
const { requestValidator } = require('./src/middlewares/request-validator');
const controllerRanking = require('./src/controllers/ranking');

app
    .post('/authenticate', controllerAuthenticate.login);

app
    .route('/markers/:current_position')
    .get(getMarkers);

app
    .route('/markers')
    .post(createMarker);

app
    .route('/markers/places/:marker_id')
    .get(getPlaceMarkers);

app
    .route('/users')
    .post(controllerUsers.createUser);

app
    .route('/users/:id(\\d+)')
    .patch(controllerUsers.updateUser);

app
    .route('/users/:email')
    .patch(controllerUsers.recoveryPassword);

app
    .route('/users/passwords/:user_id')
    .patch(controllerUsers.updatePassword);

app
    .route('/users/:id')
    .get(controllerUsers.searchUserById);

app
    .route('/ranking')
    .get(controllerRanking.createRanking);


// const authMiddleware = require('./src/middlewares/auth');
// const auth = authMiddleware.verifyJwt;
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
