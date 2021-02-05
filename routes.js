const router = require('express').Router();

const authMiddleware = require('./src/middlewares/auth');

const controllerUsers = require('./src/controllers/users');
const controllerMarkers = require('./src/controllers/markers');
const controllerAuthenticate = require('./src/controllers/authenticate');

router.post('/users', authMiddleware.verifyJwt, controllerUsers.createUser);
router.delete('/users/:id', authMiddleware.verifyJwt, controllerUsers.deleteUser);
router.patch('/users/:id', authMiddleware.verifyJwt, controllerUsers.updateUser);

router.post('/markers/:type_marker_id', authMiddleware.verifyJwt, controllerMarkers.createMarker);
router.delete('/markers/:id', authMiddleware.verifyJwt, controllerMarkers.deleteMarker);

router.post('/authenticate' ,controllerAuthenticate.login);

module.exports = router;