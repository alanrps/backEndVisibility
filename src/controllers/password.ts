import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { UserService } from '../services/users';
import { PasswordService } from '../services/password';
import { EmailService } from '../services/email';

interface PasswordController {
    update(request: Request, response: Response, next: NextFunction): Promise<Response | NextFunction>;
    recovery(request: Request, response: Response, next: NextFunction);
}

@injectable()
export class PasswordControllerImpl implements PasswordController {
    private userService: UserService;
    private passwordService: PasswordService;
    private emailService: EmailService;

    constructor(@inject(UserService) userService: UserService, @inject(PasswordService) passwordService: PasswordService, @inject(EmailService) emailService: EmailService) {
        this.userService = userService;
        this.passwordService = passwordService;
        this.emailService = emailService;
    }

    update(request: Request, response: Response, next: NextFunction): Promise<Response | NextFunction>{
        const {
            params: {
                user_id: userId,
            },
            body: {
                currentPassword: current_password,
                newPassword: new_password,
            },
        } = request;
    
        return this.userService.getById(userId)
            .then(([user]) => {
                if (!user) {
                    throw new PreconditionFailedException(23);
                }
    
                return user;
            })
            .then(user => {
                return this.passwordService.compare(current_password, user.password)
                    .then(comparisonResult => {
                        if (!comparisonResult) throw new PreconditionFailedException(4);
    
                        return comparisonResult;
                    });
            })
            .then(() => this.passwordService.encrypt(new_password))
            .then(hashPassword => this.userService.updateById(userId, {
                password: hashPassword,
            }))
            .then(() => response.status(204).send({}))
            .catch(next);
    }

    recovery(request: Request, response: Response, next: NextFunction){
        const {
            params: {
                email,
            }
        } = request;
    
        return this.userService.getByEmail(email)
            .then(user => {
                if (!user) {
                    throw new PreconditionFailedException(23);
                }
                return user;
            })
            .then(([user]) => {
                return Promise
                    .resolve()
                    .then(() => this.passwordService.generate())
                    .then(newPassword => {
                        return this.passwordService.encrypt(newPassword)
                            .then(hashPassword => this.userService.updateById(user.id, {
                                password: hashPassword,
                            }, ["password"]))
                            .then(([{ password }]) => ({ ...user, password, new_password: newPassword }))
                    })
            })
            .then(user => this.emailService.send(user.email, user.new_password))
            .then(() => response.status(204).send({}))
            .catch(next);
    }
}