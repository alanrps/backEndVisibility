import BadRequest from '../exceptions/http/BadRequest';
import { searchUserById as searchUserByIdService } from '../services/users/search-user';
import NotFoundException from '../exceptions/http/NotFoundException';
import { searchAchievements } from '../services/gamification/achievements';
import { searchAmountInformation } from '../services/gamification/information-amount';
import InternalServerError from '../exceptions/http/InternalServerError';

export function searchAchievementsByUserId(request, response, next){
    const {
        params: {
            id: userId = null,
        },
        query: {
            filter,
        },
    } = request;

    // const selectInformationAmount = [
    //     'evaluations',
    //     'public_evaluations',
    //     'private_evaluations',
    //     'place',
    //     'wheelchair_parking',
    //     'travel',
    //     'transport',
    //     'supermarket',
    //     'services',
    //     'leisure',
    //     'education',
    //     'food',
    //     'hospital',
    //     'accommodation',
    //     'finance'
    // ];

    if(!userId){
        return new BadRequest(20);
    }

    return searchUserByIdService(userId, ['id'])
        .then(([user]) => {
            if(!user){
                return new NotFoundException(23);
            }

            return user;
        })
        .then(() => {
            return Promise.all([
                searchAchievements(userId),
                searchAmountInformation(userId) // selectInformationAmount
            ])
            .then(([userAchivements, [amountInformation]]) => {
                return userAchivements.reduce((acc, userAchivement) => {
                    const {
                        category,
                        acquired,
                        actionsAmount,
                    } = userAchivement;

                    if(filter === 'notAcquired' && acquired)
                        return acc;

                    else if(filter === 'acquired' && !acquired)
                        return acc;

                    if(category){
                        const amount = acquired ? actionsAmount : amountInformation[category];
                        userAchivement['amount'] = amount;
                    }
                    else {
                        throw new InternalServerError(50);
                    }

                    acc.push(userAchivement);
                    return acc;
                }, []);
            })
        })
        .then((achievements) => response.status(200).send(achievements))
        .catch(next);
}