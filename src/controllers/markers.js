const createMarkerService = require('../services/markers/create-marker');
const deleteMarkerService = require('../services/markers/delete-marker');
const updateMarkerService = require('../services/markers/update-marker');

function createMarker(request, response){
    const {
        body: params,
        params: type_marker_id,
    } = request;

    const {

    } = request.params;

    return Promise
        .resolve(params)
        // Verificar se o type marker existe
        .then(createMarkerService)
        .then((user) => response.status(201).send(user))
        .catch(next);
}

function deleteMarker(request, response, next) {
    const {
        id,
    } = request.params;

    return Promise
        .resolve(id)
        .then(deleteMarkerService.deleteMarker)
        .then(() => response.status(204).send({}))
        .catch(next);
}

function updateMarker(request, response, next) {
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

module.exports = {
    createMarker,
    deleteMarker,
    updateMarker
};