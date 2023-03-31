import BadRequest from '../exceptions/http/BadRequest';
import PreconditionFailedException from '../exceptions/http/PreconditionFailedException';

import { convertToSnakeCase } from '../utils/convertToSnakeCase';

import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CommentsService } from '../services/comments';
import { UserService } from '../services/users';
import { MarkerService } from '../services/marker';

interface CommentsController {
    getByMarker(request: Request, response: Response, next: NextFunction);
    create(request: Request, response: Response, next: NextFunction);
}

@injectable()
export class CommentsControllerIml implements CommentsController {
    private commentsService: CommentsService;
    private userService: UserService;
    private markerService: MarkerService;

    constructor(@inject(CommentsService) commentsService: CommentsService, @inject(UserService) userService: UserService, @inject(MarkerService) markerService: MarkerService){
        this.commentsService = commentsService;
        this.userService = userService;
        this.markerService = markerService;
    }

    getByMarker(request: Request<{id: number}>, response: Response, next: NextFunction) {
        const { id: markerId } = request.params;
    
        const select = [
            'name',
            { message: 'description' },
        ];
    
        if (!markerId) {
            return new BadRequest(40);
        }
    
        return this.commentsService.getByMarkerId(select, markerId)
            .then(comments => response.status(200).send(comments))
            .catch(next);
    }

    create(request: Request, response: Response, next: NextFunction) {
        const {
            body,
        } = request;
    
    
        if (!body.userId) {
            return new BadRequest(20);
        }
    
        if (!body.markerId) {
            return new BadRequest(40);
        }
    
        const bodySnakeCase = convertToSnakeCase(body);
        const select = ['id', 'description'];
    
        return this.userService.getById(body.userId, ['id'])
            .then(user => {
                if (!user) {
                    return new PreconditionFailedException(23);
                }
    
                return user;
            })
            .then(() => this.markerService.getById(['id'], body.markerId))
            .then(marker => {
                if (!marker) {
                    return new PreconditionFailedException(41);
                }
    
                return marker;
            })
            .then(() => this.commentsService.create(bodySnakeCase, select))
            .then(([comments]) => response.status(201).send(comments))
            .catch(next);
    }
}

