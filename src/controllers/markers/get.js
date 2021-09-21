import knex from '../../../database';
import { getMarkers as getMarkersService, getPlaceMarker } from '../../services/markers/get-marker';

export function getMarkers(request, response, next) {
    const {
        params: {
            current_position: currentPosition,
        },
    } = request;

    const select = [
        'm.id',
        'm.user_id',
        'm.markers_type_id',
        knex.raw('ST_AsText("coordinates") as coordinates'),
        'm.last_updated',
        'm.denounced',
        { category_id: 'c.id' },
    ];

    return getMarkersService(select, currentPosition)
        .then(markers => response.status(200).send(markers))
        .catch(next);
}

export function getPlaceMarkers(request, response, next) {
    const {
        params: {
            marker_id: markerId,
        },
    } = request;

    const select = [
        'p.id',
        'p.marker_id',
        'p.name',
        'p.classify',
        'p.space_type',
        'p.description',
    ];

    return getPlaceMarker(select, markerId)
        .then(([placeData]) => response.status(200).send(placeData))
        .catch(next);
}

export default {};
