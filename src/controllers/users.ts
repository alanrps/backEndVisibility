import {BadRequest} from '../exceptions/http/BadRequest';
import {PreconditionFailedException} from '../exceptions/http/PreconditionFailedException';
import {NotFoundException} from '../exceptions/http/NotFoundException';

import { sendEmailMessage } from '../services/email';
import { convertToSnakeCase } from '../utils/convertToSnakeCase';

import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { UserService } from '../services/users';
import { PasswordService } from '../services/password';
import { TokenService } from '../services/authenticate/token';
import { InformationAmountService } from '../services/gamification/information-amount';

interface UserController {
    getById(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    update(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    create(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
    delete(request: Request, response: Response, next: NextFunction): Promise<void | Response>;
}

@injectable()
export class UserControllerImpl implements UserController {
    private userService: UserService;
    private passwordService: PasswordService;
    private tokenService: TokenService;
    private informationAmountService: InformationAmountService;

    constructor(@inject(UserService) userService: UserService, @inject(PasswordService) passwordService: PasswordService, @inject(TokenService) tokenService: TokenService, @inject(InformationAmountService) informationAmountService: InformationAmountService) {
        this.userService = userService;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.informationAmountService = informationAmountService;
    }
    
    getById(request: Request<{ id: number }>, response: Response, next: NextFunction): Promise<void | Response> {
        const { id } = request.params;
    
        const atributtes = ['id', 'name', 'phone_number', 'birth_date'];
    
        if(!id){
            return new BadRequest(20);
        }
        
        return this.userService.getById(id, atributtes)
            .then(([user]) => {
                if(!user){
                    return new NotFoundException(23);
                }
    
                return user;
            })
            .then(user => response.status(200).send(user))
            .catch(next);
    }

    create(request: Request, response: Response, next: NextFunction) : Promise<void | Response>{
        const {
            body,
        } = request;
    
        const bodySnakeCase = convertToSnakeCase(body);
    
        const {
            email,
            password,
        } = bodySnakeCase;
    
        return this.userService.getByEmail(email)
            .then(user => {
                if (user.length) {
                    throw new PreconditionFailedException(21);
                }
                return user;
            })
            .then(() => this.passwordService.encrypt(password))
            .then(hashPassword => Object.assign(bodySnakeCase, { password: hashPassword }))
            .then(() => this.userService.create(bodySnakeCase, ['id', 'birth_date', 'name', 'phone_number', 'email', 'gender']))
            .then(([userData]) => this.informationAmountService.createByUser({ user_id: userData.id })
                .then(() => this.tokenService.generate(userData))
                .then(token => Object.assign(userData, { token })))
            .then(userAndToken => response.status(201).send(userAndToken))
            .catch(next);
    }

    delete(request: Request<{ id: number }>, response: Response, next: NextFunction): Promise<void | Response> {
        const {
            id,
        } = request.params;
    
        return Promise
            .resolve(id)
            .then(this.userService.delete)
            .then(() => response.status(204).send({}))
            .catch(next);
    }

    update(request: Request<{ id: number }>, response: Response, next: NextFunction): Promise<void | Response> {
        const {
            params: {
                id: userId,
            },
            body: userData,
        } = request;
    
        const {
            name,
            phone_number,
            birth_date,
        } = convertToSnakeCase(userData);
        
        const returnData = ['id', 'name', 'phone_number', 'email', 'birth_date', 'gender'];

        return this.userService.getById(userId)
            .then(([user]) => {
                if (!user) {
                    throw new PreconditionFailedException(23);
                }
                return user;
            })
            .then(() => this.userService.updateById(userId, { name, phone_number, birth_date }, returnData))
            .then(([updatedUser]) => response.status(200).send(updatedUser))
            .catch(next);
    }
}
