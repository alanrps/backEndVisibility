import BadRequest from '../exceptions/http/BadRequest';
import { searchUserById as searchUserByIdService } from '../services/users/search-user';
import NotFoundException from '../exceptions/http/NotFoundException';
import { searchAmountInformation, updateAmountInformation } from '../services/gamification/information-amount';
import { searchCurrentLevelData } from '../services/gamification/levels';
import { searchAction } from '../services/gamification/actions';
import { searchAchievements, createAcquiredAchievements } from '../services/gamification/achievements';

export function searchInformationAmountByUser(request, response, next){
    const {
        id
    } = request.params;

    if(!id){
        return new BadRequest(20);
    }

    const selectInformationAmount = [
        { description: 'l.description' },
        { points: 'ia.points' },
        { weeklyPoints: 'weekly_points'},
        { publicEvaluations: 'public_evaluations' },
        { privateEvaluations: 'private_evaluations' },
        { wheelchairParking: 'wheelchair_parking' },
        { accessiblePlace: 'accessible_place' },
        { notAccessiblePlace: 'not_accessible_place'},
        { partiallyAccessiblePlace: 'partially_accessible_place'},
        'level',
        'marking',
        'place',
        'travel',
        'transport',
        'supermarket',
        'services',
        'leisure',
        'education',
        'food',
        'hospital',
        'accommodation',
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
            // PEGAR A DESCRIÇÃO -> VERIFICAR SE A ROTA ESTÁ SENDO USADA EM OUTROS LUGARES
            searchCurrentLevelData(selectLevels, infomationAmount.level + 1)
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
            currentAction,
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
        .then(() => Promise.all([
            searchAmountInformation(id, [ ...updatedProperties, 'level', 'ia.points', 'weekly_points' ]),
            searchCurrentLevelData(['id', 'points']),
            searchAction(['id', 'points']),
            searchAchievements(id, 'notAcquired')
        ]))
        .then(async ([[amountInformation], levels, action, achievements]) => {
            console.log('AMOUNT INFORMATION', amountInformation);
            console.log('CURRENT LEVEL', levels);
            console.log('ACTION', action);
            console.log('ACHIEVEMENTS', achievements);

            const actionPoints = action.reduce((acc, action) => {
                if(currentAction === action.id){
                    acc = action.points;
                }

                return acc;
            }, 0);

            const entriesInformation = Object.entries(amountInformation);
            const infomationAmountUpdated = entriesInformation.reduce((acc, [key, value]) => {
                if(key === 'points' || key === 'weekly_points'){
                    acc[key] = value + actionPoints;
                }
                else if(key === 'level')
                    acc[key] = value;
                else
                    acc[key] = value + 1;
                
                return acc;
            }, {});

            const updatedLevel = infomationAmountUpdated.level === 10 ? false : levels.reduce((acc, level) => {
                if(level.id === infomationAmountUpdated.level + 1)
                    if(infomationAmountUpdated.points >= level.points) {
                        infomationAmountUpdated.level = level.id;
                        return true;
                    }
                
                return acc;
            }, false);

            let insertAchievementsAcquired = [];
            const achievementsAcquired = achievements.reduce((acc, achievement) => {
                if(infomationAmountUpdated[achievement.category])
                    if(infomationAmountUpdated[achievement.category] >= achievement.actionsAmount){
                        acc.push({ description: achievement.description}); // ADICIONAR NOME
                        insertAchievementsAcquired.push({
                            user_id: id,
                            achievement_id: achievement.id,
                            acquired: true
                        });
                    }
                
                return acc;
            }, []);
            
            console.log(insertAchievementsAcquired);
            console.log(achievementsAcquired);

            await Promise.all([
                await createAcquiredAchievements(insertAchievementsAcquired),
                await updateAmountInformation(id, infomationAmountUpdated)
            ]);

            return [{ updatedLevel, level: infomationAmountUpdated.level }, achievementsAcquired || []];
        })
        .then((dataResponse) => response.status(200).send(dataResponse))
        .catch(err => console.log(err));
}