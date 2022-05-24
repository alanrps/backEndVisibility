import knex from '../../../database';
import { getMarkers as getMarkersService, getPlaceMarker } from '../../services/markers/get-marker';

// export function getMarkerById(request, response, next) {
//     const {
//         id: markerId,
//     } = request.params;

//     const select = ['m.id'];

//     return getMarkersService(select, currentPosition)
//         .then(markers => response.status(200).send(markers))
//         .catch(next);
// }

export function getMarkers(request, response, next) {
    const {
        params: {
            current_position: currentPosition,
        },
        query: {
            categories = null,
            acessibilities = null
        },
        filter = {},
    } = request;

    console.log(categories);
    console.log(acessibilities);

    const select = [
        'm.id',
        'm.user_id',
        'm.markers_type_id',
        knex.raw('ST_AsText("coordinates") as coordinates'),
        'm.last_updated',
        'm.denounced',
        { category_id: 'm.category_id' },
    ];

    filter.categories = categories ? JSON.parse(categories) : [];
    filter.acessibilities = acessibilities ? JSON.parse(acessibilities) : [];

    console.log(filter);
    
    return getMarkersService(select, currentPosition, filter)
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
        'p.name',
        'p.classify',
        'p.description',
        { spaceType: 'p.space_type' },
        { categoryId: 'm.category_id' },
        { markerId: 'p.marker_id' },
    ];

    return getPlaceMarker(select, markerId)
        .then(([placeData]) => response.status(200).send(placeData))
        .catch(next);
}

export default {};
