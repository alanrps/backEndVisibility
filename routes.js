const app = require('express')();
const controllerUsers = require('./src/controllers/users');
const controllerAuthenticate = require('./src/controllers/authenticate');
const { createMarker } = require('./src/controllers/markers/create');
const { updateMarker } = require('./src/controllers/markers/update');
const { getMarkers, getPlaceMarkers } = require('./src/controllers/markers/get');
const { schemaCreateMarker } = require('./src/validators/markers/create-marker');
const { verifyJwt } = require('./src/middlewares/auth');
const controllerRanking = require('./src/controllers/ranking');
const { searchAchievementsByUserId } = require('./src/controllers/achievements');
const { createRanking } = require('./src/controllers/ranking');
const { insertComments, searchComments } = require('./src/controllers/comments');
const { searchInformationAmountByUser, updateInformationAmountByUser } = require('./src/controllers/informations-amount');

// ENDPOINTS COM AUTENTICAÇÃO

app
    .get('/', (req, res, next) => res.send({ server: true }));

app
    .post('/markers', [
        verifyJwt,
        createMarker
    ]);

app
    .patch('/markers/:id', [
        verifyJwt,
        updateMarker
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
        // verifyJwt,
        controllerUsers.searchUserById
    ]);
app
    .get('/ranking', [
        // verifyJwt,
        createRanking
    ]);
app
    .get('/users/:id/achievements', [
        // verifyJwt,
        searchAchievementsByUserId
    ]);

app
    .get('/users/:id/informationAmount', [
        // verifyJwt,
        searchInformationAmountByUser
    ]);

app
    .patch('/users/:id/informationAmount', [
        // verifyJwt,
        updateInformationAmountByUser
    ]);

app
    .get('/markers/:id/comments', [
        // verifyJwt,
        searchComments,
    ]);
app
    .post('/markers/comments', [
        // verifyJwt,
        insertComments,
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
