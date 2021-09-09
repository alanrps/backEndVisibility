// const createMarkerService = require('../services/markers/create-marker');
const knex = require('../../database');
const deleteMarkerService = require('../services/markers/delete-marker');
const updateMarkerService = require('../services/markers/update-marker');
const { createMarker: createMarkerService } = require('../services/markers/create-marker');
const { createPlace } = require('../services/places/create-place');

export function deleteMarker(request, response, next) {
    const {
        id,
    } = request.params;

    return Promise
        .resolve(id)
        .then(deleteMarkerService.deleteMarker)
        .then(() => response.status(204).send({}))
        .catch(next);
}

export function updateMarker(request, response, next) {
    const {
        body: params,
    } = request;

    const {
        id,
    } = request.params;

    return Promise
        .resolve()
        // Verificar se o marker existe
        .then(() => updateMarkerService.updateMarker(id, params))
        .then(() => response.status(200).send({}))
        .catch(next);
}

export default {};
