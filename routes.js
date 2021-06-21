const router = require('express').Router();

const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');

// const authMiddleware = require('./src/middlewares/auth');
// const auth = authMiddleware.verifyJwt;

router.post('/authenticate', controllerAuthenticate.login);
router.post('/signup', controllerUsers.createUser);

// router.delete('/users/:id', controllerUsers.deleteUser);
router.patch('/users/:user_id', controllerUsers.updateUser);

// Rota de atualização de senha
router.patch('/users/password/:user_id');

router.post('/markers/:type_marker_id', controllerMarkers.createMarker);
router.delete('/markers/:id', controllerMarkers.deleteMarker);

module.exports = router;
