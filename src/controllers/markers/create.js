
import knex from '../../../database';
import { createMarker as createMarkerService } from '../../services/markers/create-marker';
import { createPlace } from '../../services/places/create-place';

export function createMarker(request, response, next) {
    const {
        body: {
            marker,
            place = null,
            point_data: pointData,
        },
    } = request;

    const point = `POINT(${pointData.longitude} ${pointData.latitude})`;
    Object.assign(marker, {
        coordinates: point, user_id: 3,
    });

    const markerSelect = [
        'id',
        'user_id',
        'markers_type_id',
        knex.raw('ST_AsText(coordinates) AS coordinates'),
    ];

    console.log(marker);

    return createMarkerService(marker, markerSelect)
        .then(([createdMarker]) => {
            if (place) {
                return createPlace({ ...place, marker_id: createdMarker.id })
                    .then(() => createdMarker);
            }

            return createdMarker;
        })
        .then(markerData => response.status(201).send(markerData))
        .catch(next);
}

export default {};
