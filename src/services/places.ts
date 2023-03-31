import knex from '../../database';

class Place {
    constructor(){}
}

interface PlaceRepository {
    create(place: Place): Promise<Place>;
    update(id: number, place: Place, returnData: Array<string>): Promise<Place | null>;
    getById(select: Array<string>, id: number): Promise<Place>;
}

export class PlaceService implements PlaceRepository {
    create(place: Place) : Promise<Place>{
        return knex('places')
            .insert(place);
    }

    update(id: number, place: Place, returnData: Array<string> = ['*']) : Promise<Place | null>{
        return new Promise((resolve, reject) => knex({ p: 'places' })
            .returning(returnData)
            .update(place)
            .where('p.marker_id', id)
            .whereNull('p.deleted_at')
            .then(resolve)
            .catch(reject));
    }

    getById(select: Array<string>, id: number) : Promise<Place> {
        return knex({ m: 'markers' })
            .select(select)
            .innerJoin(({ p: 'places' }), builder => {
                builder.on('m.id', 'p.marker_id');
                builder.andOnNull('p.deleted_at');
            })
            .where('m.id', id)
            .whereNull('m.deleted_at');
    }
}

