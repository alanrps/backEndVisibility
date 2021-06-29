import { createMarker as createMarkerService } from '../../services/markers/create-marker';
import { createPlace } from '../../services/places/create-place';

export function createMarker(request, response, next) {
    const {
        body: {
            marker: markerData,
            type_marker: typeMarker,
            place = null,
        },
    } = request;

    return createMarkerService(markerData)
        .then(([createdMarker]) => {
            if (typeMarker === 'PLACE') {
                return createPlace(place)
                    .then(() => createdMarker);
            }
            return createdMarker;
        })
        .then(marker => response.status(201).send(marker))
        .catch(next);
}

export default {};
