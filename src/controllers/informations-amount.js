import BadRequest from '../exceptions/http/BadRequest';
import { searchUserById as searchUserByIdService } from '../services/users/search-user';
import NotFoundException from '../exceptions/http/NotFoundException';
import { searchAmountInformation, updateAmountInformation } from '../services/gamification/information-amount';
import { searchCurrentLevelData } from '../services/gamification/levels';

export function searchInformationAmountByUser(request, response, next){
    const {
        id
    } = request.params;

    if(!id){
        return new BadRequest(20);
    }

    const selectInformationAmount = [
        'level',
        'points',
        { publicEvaluations: 'public_evaluations' },
        { privateEvaluations: 'private_evaluations' },
        { wheelchairParking: 'wheelchair_parking' },
        { accessiblePlace: 'accessible_place' },
        { notAccessiblePlace: 'not_accessible_place'},
        { partiallyAccessiblePlace: 'partially_accessible_place'},
        'evaluations',
        'place',
        'travel',
        'transport',
        'supermarket',
        'services',
        'leisure',
        'education',
        'food',
        'hospital',
        'accomodation',
        'finance'
    ];

    const selectLevels = [
        { nextLevelPoints: 'points'}
    ];

    return searchUserByIdService(id, ['id'])
        .then(([user]) => {
            if(!user){
                return new NotFoundException(23);
            }

            return user;
        })
        .then(() => searchAmountInformation(id, selectInformationAmount))
        .then(([infomationAmount]) => 
            searchCurrentLevelData(infomationAmount.level + 1, selectLevels)
                .then(([levelData]) => ({...infomationAmount, nextLevelPoints: levelData.nextLevelPoints}))
        )
        .then((informations) => response.status(200).send(informations))
        .catch(next);
}

export function updateInformationAmountByUser(request, response, next){
    const {
        params: {
            id,
        },
        body: {
            updatedProperties,
        },
    } = request;

    if(!id){
        return new BadRequest(20);
    }

    return searchUserByIdService(id, ['id'])
        .then(([user]) => {
            if(!user){
                return new NotFoundException(23);
            }

            return user;
        })
        .then(() => searchAmountInformation(id, updatedProperties))
        .then(([informationsAmount]) => {
            const entriesInformation = Object.entries(informationsAmount);

            return entriesInformation.reduce((acc, [key, value]) => {
                acc[key] = value + 1;
                
                return acc;
            }, {});
        })
        .then((informationsUpdate) => updateAmountInformation(id, informationsUpdate))
        .then(() => response.status(204).send({}))
        .catch(next);
}