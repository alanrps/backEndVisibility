
import { updateMarker as updateMarkerService } from '../../services/markers/update-marker';
import { updatePlace } from '../../services/places/update-place';
import { convertToSnakeCase } from '../../utils/convertToSnakeCase';

export function updateMarker(request, response, next) {
    const {
        params: {
            id,
        },
        body,
    } = request;

    console.log(id);
    console.log(body);

    const marker_id = parseInt(id);
    const bodySnakeCase = convertToSnakeCase(body);

    const {
        name,
        description,
        space_type,
        classify,
        category_id,
    } = bodySnakeCase;
        
    const select = ['id'];

    return updateMarkerService(marker_id, { category_id }, select)
        .then(() => updatePlace(marker_id, { name, description, space_type, classify }), select)
        .then(() => response.status(204).send({}))
        .catch(next);
}

export default {};
