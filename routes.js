const app = require('express')();
const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');
const { createMarker } = require('./src/controllers/markers/create');
const { getMarkers, getPlaceMarkers } = require('./src/controllers/markers/get');
const { schemaCreateMarker } = require('./src/validators/markers/create-marker');
const { requestValidator } = require('./src/middlewares/request-validator');


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

// const authMiddleware = require('./src/middlewares/auth');
// const auth = authMiddleware.verifyJwt;
// app
//     .delete('/markers/:id', controllerMarkers.deleteMarker);
// app
//     .patch('/users/:user_id', controllerUsers.updateUser);

// app
//     .put('/users/password/:user_id', controllerUsers.updatePassword);

// app
//     .route('/markers/:type_marker_id')
//     .post([
//         requestValidator(schemaCreateMarker),
//         controllerMarkers.createMarker,
//     ]);


// app.delete('/users/:id', controllerUsers.deleteUser);

module.exports = app;
