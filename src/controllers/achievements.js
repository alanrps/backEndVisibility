import BadRequest from '../exceptions/http/BadRequest';
import { searchUserById as searchUserByIdService } from '../services/users/search-user';
import NotFoundException from '../exceptions/http/NotFoundException';
import { searchAchievements } from '../services/gamification/achievements';
import { searchAmountInformation } from '../services/gamification/information-amount';

export function searchAchievementsByUserId(request, response, next){
    const {
        id: userId 
    } = request.params;

    const selectInformationAmount = [
        'evaluations',
        'public_evaluations',
        'private_evaluations',
        'place',
        'wheelchair_parking',
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
                searchAmountInformation(userId, selectInformationAmount)
            ])
            .then(([userAchivements, [amountInformation]]) => {
                return userAchivements.map(userAchivement => {
                    const {
                        category,
                        acquired,
                        actionsAmount,
                    } = userAchivement;

                    if(category){
                        const amount = acquired ? actionsAmount : amountInformation[category];
                        userAchivement['amount'] = amount;
                    }
                    // Se não tiver categoria?

                    return userAchivement;
                })
            })

        })
        .then((achievements) => response.status(200).send(achievements))
        .catch(next);
}