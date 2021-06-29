const router = require('express').Router();

const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');

const { schemaCreateMarker } = require('./src/validators/markers/create-marker');


const { requestValidator } = require('./src/middlewares/request-validator');
// const authMiddleware = require('./src/middlewares/auth');
// const auth = authMiddleware.verifyJwt;

router
    .post('/authenticate', controllerAuthenticate.login);

router
    .post('/signup');

router
    .patch('/users/:user_id', controllerUsers.updateUser);

router
    .put('/users/password/:user_id', controllerUsers.updatePassword);

router
    .route('/markers/:type_marker_id')
    .post([
        requestValidator(schemaCreateMarker),
        controllerMarkers.createMarker,
    ]);

router
    .delete('/markers/:id', controllerMarkers.deleteMarker);

// router.delete('/users/:id', controllerUsers.deleteUser);

module.exports = router;
