const router = require('express').Router();

const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');

// const authMiddleware = require('./src/middlewares/auth');
// const auth = authMiddleware.verifyJwt;

router
    .post('/authenticate', controllerAuthenticate.login);

router
    .post('/signup', controllerUsers.createUser);

router
    .patch('/users/:user_id', controllerUsers.updateUser);

router
    .put('/users/password/:user_id', controllerUsers.updatePassword);

router
    .post('/markers/:type_marker_id', controllerMarkers.createMarker);

router
    .delete('/markers/:id', controllerMarkers.deleteMarker);

// router.delete('/users/:id', controllerUsers.deleteUser);

module.exports = router;
