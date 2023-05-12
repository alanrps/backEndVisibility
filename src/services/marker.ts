
import knex from '../config/database';
import { Knex } from 'knex';

interface Marker {
    id?: number,
    user_id: number,
    markers_type_id: string,
    coordinates: string,
    // ! Verificar se realmente é um número
    last_updated: number,
    denounced: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
}


interface MarkerRepository {
    getByPosition(returnData: Array<string | Knex.Raw | {}>, currentPosition: string, filter: { categories: [], acessibilities: [] }): Promise<Array<Marker>>;
    getById(returnData: Array<string>, id: number) : Promise<Array<Marker>>;
    update(id: number, marker: Marker, returnData: Array<string>): Promise<Marker | null>;
    delete(id: number, returnData: Array<string>): Promise<Marker | null>;
    create(marker: Marker, returnData: Array<string | Knex.Raw>) : Promise<Array<Marker>>;
}


export class MarkerService implements MarkerRepository {
    getByPosition(returnData: Array<string | Knex.Raw | {}>, currentPosition: string, filter: { categories: [], acessibilities: [] }): Promise<Array<Marker>> {
        console.log(filter);
    
        const subqueryPlaces = knex({ m: 'markers' })
            .select('m.id')
            .leftJoin({ p: 'places' }, builder => {
                builder.on('m.id', 'p.marker_id');
                builder.onNull('p.deleted_at');
            })
            .where('m.markers_type_id', 'PLACE')
            .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
            .whereNull('m.deleted_at');
    
        if(filter.acessibilities.length){
            console.info('FILTRO ACESSIBILIDADE');
            subqueryPlaces
                .whereIn('p.classify', filter.acessibilities);
        }
    
        if(filter.categories.length){
            console.info('FILTRO CATEGORIA');
            subqueryPlaces
                .whereIn('m.category_id', filter.categories);
        }
    
        const subqueryParking = knex({ m: 'markers' })
            .select('m.id')
            .where('m.markers_type_id', 'WHEELCHAIR_PARKING')
            .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
            .whereNull('m.deleted_at');
    
        const query = knex.select(returnData)
            .from({ m: 'markers' })
            .whereIn('m.id',subqueryParking)
            .orWhereIn('m.id', subqueryPlaces);
    
            return query
                .whereRaw(knex.raw(`ST_Distance('${currentPosition}', "coordinates") < 500`))
                .whereNull('m.deleted_at');
    }

    getById(returnData: Array<string>, id: number) : Promise<Array<Marker>> {
        return knex({ m: 'markers' })
            .select(returnData)
            .where('m.id', id)
            .whereNull('m.deleted_at');
    }

    delete(id: number) : Promise<Marker | null> {
        return new Promise((resolve, reject) => knex({ mk: 'markers' })
            .whereNull('mk.deleted_at')
            .andWhere('mk.id', '=', id)
            .del()
            .then(resolve)
            .catch(reject));
    }

    create(marker: Marker, returnData: Array<string | Knex.Raw>) : Promise<Array<Marker>>{
        return knex('markers')
            .insert(marker, returnData);
    }

    update(id: number, marker: Marker, returnData: Array<string> = ['*']) : Promise<Marker>{
        return new Promise((resolve, reject) => knex({ m: 'markers' })
            .returning(returnData)
            .update(marker)
            .where('m.id', id)
            .whereNull('m.deleted_at')
            .then(resolve)
            .catch(reject));
    }
}

