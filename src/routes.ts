
import 'reflect-metadata';
import container from './config/container';

import { Router } from 'express';
const router = Router();

const controllerUsers = require('./src/controllers/users');
const { getMarkers, getPlaceMarkers } = require('./src/controllers/markers/get');
const { verifyJwt } = require('./src/middlewares/auth');

import { UserControllerImpl } from './controllers/users';
import { MarkerControllerImpl } from './controllers/markers';
import { RankingControllerImpl } from './controllers/ranking';
import { CommentsControllerIml } from './controllers/comments';
import { InformationAmountControllerImpl } from './controllers/information-amount';
import { AuthenticateControllerImpl } from './controllers/authenticate';
import { AchievementControllerImpl } from './controllers/achievement';

const userController = container.resolve<UserControllerImpl>(UserControllerImpl);
const markerController = container.resolve<MarkerControllerImpl>(MarkerControllerImpl);
const commentController = container.resolve<CommentsControllerIml>(CommentsControllerIml);
const informationAmountController = container.resolve<InformationAmountControllerImpl>(InformationAmountControllerImpl);
const authenticateController = container.resolve<AuthenticateControllerImpl>(AuthenticateControllerImpl);
const achievementController = container.resolve<AchievementControllerImpl>(AchievementControllerImpl);
const rankingConttroller = container.resolve<RankingControllerImpl>(RankingControllerImpl);


// ENDPOINTS COM AUTENTICAÇÃO
router
    .get('/', (req, res, next) => res.send({ server: true }));

router
    .post('/markers', [
        verifyJwt,
        markerController.create
    ]);

router
    .patch('/markers/:id', [
        verifyJwt,
        markerController.update
    ]);

router
    .patch('/users/:id(\\d+)', [
        verifyJwt,
        userController.update
    ]);
router
    .patch('/users/passwords/:user_id', [
        verifyJwt,
        controllerUsers.updatePassword
    ]);
router
    .get('/users/:id', [
        // verifyJwt,
        userController.getById
    ]);
router
    .get('/ranking', [
        // verifyJwt,
        rankingConttroller.create
    ]);
router
    .get('/users/:id/achievements', [
        // verifyJwt,
        achievementController.getById
    ]);

router
    .get('/users/:id/informationAmount', [
        // verifyJwt,
        informationAmountController.getByUser
    ]);

router
    .patch('/users/:id/informationAmount', [
        // verifyJwt,
        informationAmountController.updateByUser
    ]);

router
    .get('/markers/:id/comments', [
        // verifyJwt,
        commentController.getByMarker,
    ]);
router
    .post('/markers/comments', [
        // verifyJwt,
        commentController.create,
    ]);


// ENDPOINTS SEM AUTENTICAÇÃO
router
    .post('/authenticate', authenticateController.login);
router
    .get('/markers/:current_position', getMarkers);
router
    .post('/users', userController.create);
router
    .patch('/users/:email', controllerUsers.recoveryPassword);
router
    .get('/markers/places/:marker_id', getPlaceMarkers);

// router
//     .delete('/markers/:id', controllerMarkers.deleteMarker);

// router
//     .route('/markers/:type_marker_id')
//     .post([
//         requestValidator(schemaCreateMarker),
//         controllerMarkers.createMarker,
//     ]);

// router.delete('/users/:id', userController.delete);

export default router;
