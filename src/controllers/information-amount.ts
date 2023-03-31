import { Request, Response, NextFunction } from 'express';

import BadRequest from '../exceptions/http/BadRequest';
import NotFoundException from '../exceptions/http/NotFoundException';

import { injectable, inject } from 'inversify';
import { UserService } from '../services/users';
import { LevelService } from '../services/gamification/level';
import { ActionService } from '../services/gamification/action';
import { AchievementService } from '../services/gamification/achievement';
import { InformationAmountService } from '../services/gamification/information-amount';

interface InformationAmountController {
    getByUser(request: Request, response: Response, next: NextFunction);
    updateByUser(request: Request, response: Response, next: NextFunction);
}

@injectable()
export class InformationAmountControllerImpl implements InformationAmountController {
    private informationAmountService: InformationAmountService;
    private userService: UserService;
    private levelService: LevelService;
    private actionService: ActionService;
    private achievementService: AchievementService;

    constructor(@inject(InformationAmountService) informationAmountService: InformationAmountService, @inject(UserService) userService: UserService, @inject(LevelService) levelService: LevelService, @inject(ActionService) actionService: ActionService, @inject(AchievementService) achievementService: AchievementService){
        this.informationAmountService = informationAmountService;
        this.userService = userService;
        this.levelService = levelService;
        this.actionService = actionService;
        this.achievementService = achievementService;
    }

    getByUser(request: Request, response: Response, next: NextFunction) {
        const {
            id,
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
    
        return this.userService.getById(id, ['id'])
            .then(([user]) => {
                if(!user){
                    return new NotFoundException(23);
                }
    
                return user;
            })
            .then(() => this.informationAmountService.getByUser(id, selectInformationAmount))
            .then(([infomationAmount]) =>
                // PEGAR A DESCRIÇÃO -> VERIFICAR SE A ROTA ESTÁ SENDO USADA EM OUTROS LUGARES
                this.levelService.getData(selectLevels, infomationAmount.level + 1)
                    .then(([levelData]) => ({...infomationAmount, nextLevelPoints: levelData.nextLevelPoints}))
            )
            .then((informations) => response.status(200).send(informations))
            .catch(next);
    }

    updateByUser(request: Request<{ id:number }>, response: Response, next: NextFunction) {
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
    
        return this.userService.getById(id, ['id'])
            .then(([user]) => {
                if(!user){
                    return new NotFoundException(23);
                }
    
                return user;
            })
            .then(() => Promise.all([
                this.informationAmountService.getByUser(id, [ ...updatedProperties, 'level', 'ia.points', 'weekly_points' ]),
                this.levelService.getData(['id', 'points']),
                this.actionService.get(['id', 'points']),
                this.achievementService.getByUser(id, 'notAcquired')
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
                    await this.achievementService.add(insertAchievementsAcquired),
                    await this.informationAmountService.updateByUser(id, infomationAmountUpdated)
                ]);
    
                return [{ updatedLevel, level: infomationAmountUpdated.level }, achievementsAcquired || []];
            })
            .then((dataResponse) => response.status(200).send(dataResponse))
            .catch(next);
    }
}

