import knex from '../../../database';
import { getMarkers as getMarkersService } from '../../services/markers/get-marker';

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
        knex.raw('ST_AsText("coordinates")'),
        'm.last_updated',
        'm.denounced',
        { category_id: 'c.id' },
    ];

    return getMarkersService(select, currentPosition)
        .then(markers => response.status(200).send(markers))
        .catch(next);
}

export default {};
