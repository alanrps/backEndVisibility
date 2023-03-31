import knex from '../../database';
import { convertToSnakeCase } from '../../utils/convertToSnakeCase';

import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { MarkerService } from '../services/marker';
import { PlaceService } from '../services/places';

interface MarkerController {
    getByPosition(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    delete(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    update(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    // getById(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
}

@injectable()
export class MarkerControllerImpl implements MarkerController {
    private markerService: MarkerService;
    private placeService: PlaceService;

    constructor(@inject(MarkerService) markerService: MarkerService, @inject(PlaceService) placeService: PlaceService){
        this.markerService = markerService;
        this.placeService = placeService;
    }

    getByPosition(request: Request, response: Response, next: NextFunction) {
        const {
            params: {
                current_position: currentPosition,
            },
            query: {
                categories = null,
                acessibilities = null
            },
            // ! Verificar o filtro, pois não é passado, nem na query, params ou body
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
        
        return this.markerService.getByPosition(select, currentPosition, filter)
            .then(markers => response.status(200).send(markers))
            .catch(next);
    }

    delete(request: Request<{ id:number }>, response: Response, next: NextFunction): Promise<void | Response> {
        const {
            id,
        } = request.params;
    
        return Promise
            .resolve(id)
            .then(this.markerService.delete)
            .then(() => response.status(204).send({}))
            .catch(next);
    }

    update(request: Request<{ id: number }>, response: Response, next: NextFunction) : Promise<void | Response>{
        const {
            body: params,
        } = request;
     
        const {
            id,
        } = request.params;
    
        return Promise
            .resolve()
            // Verificar se o marker existe
            .then(() => this.markerService.update(id, params))
            .then(() => response.status(200).send({}))
            .catch(next);
    }

    create(request: Request, response: Response, next: NextFunction) {
        const {
            body: {
                marker,
                place = null,
                point_data: pointData,
            },
        } = request;
    
        const point = `POINT(${pointData.longitude} ${pointData.latitude})`;
    
        Object.assign(marker, {
            coordinates: point
        });
    
        const markerSelect = [
            'id',
            'user_id',
            'markers_type_id',
            'denounced',
            'last_updated',
            'category_id',
            knex.raw('ST_AsText(coordinates) AS coordinates'),
        ];
    
        console.log(marker);
    
        return this.markerService.create(marker, markerSelect)
            .then(([createdMarker]) => {
                if (place) {
                    return this.placeService.create({ ...place, marker_id: createdMarker.id })
                        .then(() => createdMarker);
                }
    
                return createdMarker;
            })
            .then(markerData => response.status(201).send(markerData))
            .catch(next);
    }

    updateMarker(request: Request<{ id: number }>, response: Response, next: NextFunction) {
        const {
            params: {
                id,
            },
            body,
        } = request;
    
        console.log(id);
        console.log(body);
    
        const marker_id = id;
        const bodySnakeCase = convertToSnakeCase(body);
    
        const {
            name,
            description,
            space_type,
            classify,
            category_id,
        } = bodySnakeCase;
            
        const select = ['id'];
    
        return this.markerService.update(marker_id, { category_id }, select)
            .then(() => this.placeService.update(marker_id, { name, description, space_type, classify }), select)
            .then(() => response.status(204).send({}))
            .catch(next);
    }
    
     // getById(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    //         const {
    //             id: markerId,
    //         } = request.params;
        
    //         const select = ['m.id'];
        
    //         return this.markerService.getByPosition(select, currentPosition)
    //             .then(markers => response.status(200).send(markers))
    //             .catch(next);
    // }
}