import { BadRequest } from '../exceptions/http/BadRequest';
import { NotFoundException } from '../exceptions/http/NotFoundException';
import { InternalServerError } from '../exceptions/http/InternalServerError';

import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { UserService } from '../services/users';
import { AchievementService } from '../services/gamification/achievement';
import { InformationAmountService } from '../services/gamification/information-amount';

interface AchievementController {
    getById(request: Request<{ id: number }>, response: Response, next: NextFunction);
}

@injectable()
export class AchievementControllerImpl implements AchievementController {
    private userService: UserService;
    private informationAmountService: InformationAmountService;
    private achievementService: AchievementService;

    constructor(@inject(UserService) userService: UserService, @inject(InformationAmountService) informationAmountService: InformationAmountService, @inject(AchievementService) achievementService: AchievementService){
        this.userService = userService;
        this.informationAmountService = informationAmountService;
        this.achievementService = achievementService;
    }

    getById(request: Request<{ id: number }>, response: Response, next: NextFunction) {
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
    
        if (!userId) {
            return new BadRequest(20);
        }
    
        return this.userService.getById(userId, ['id'])
            .then(([user]) => {
                if (!user) {
                    return new NotFoundException(23);
                }
    
                return user;
            })
            .then(() => Promise.all([
                this.achievementService.getByUser(userId),
                this.informationAmountService.getByUser(userId),
            ])
                .then(([userAchivements, [amountInformation]]) => userAchivements.reduce((acc, userAchivement) => {
                    const {
                        category,
                        acquired,
                        actionsAmount,
                    } = userAchivement;
    
                    if (filter === 'notAcquired' && acquired) { return acc; }
    
                    if (filter === 'acquired' && !acquired) { return acc; }
    
                    if (category) {
                        const amount = acquired ? actionsAmount : amountInformation[category];
                        userAchivement.amount = amount;
                    } else {
                        throw new InternalServerError(50);
                    }
    
                    acc.push(userAchivement);
                    return acc;
                }, [])))
            .then(achievements => response.status(200).send(achievements))
            .catch(next);
    }
}