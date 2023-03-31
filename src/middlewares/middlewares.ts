import jwt from 'jsonwebtoken';
import { snakeCase } from 'snake-case';
import { Request, Response, NextFunction } from 'express';

const { SECRET } = process.env;

interface Middlewares {
    verifyJwt(request: Request, response: Response, next: NextFunction);
    convertToSnakeCase(params: Object): Object;
}

export class MiddlewaresService implements Middlewares {
    convertToSnakeCase(params: Object): Object {
        const entriesParams = Object.entries(params);
    
        const snakeCaseParams = entriesParams.reduce((acc, [key, value]) => {
            acc[snakeCase(key)] = value;
    
            return acc;
        }, {});
    
        return snakeCaseParams;
    }

    verifyJwt(request: Request, response: Response, next: NextFunction) {
        return new Promise((resolve, reject) => {
            const headerToken = request.headers['authorization'];
    
            if (!headerToken) return response.status(401).send({ auth: false, message: 'No token provided' });
    
            const parts = headerToken.split(' ');
    
            if (!parts.lenght === 2) return response.status(401).send({ auth: false, message: 'Token error' });
    
            const [scheme, token] = parts;
    
            if (!/^Bearer$/i.test(scheme)) return response.status(401).send({ auth: false, message: 'Token mal formatted' });
    
            return jwt.verify(token, SECRET, (err, decoded) => {
                if (err) return response.status(401).send({ auth: false, message: 'Token invalid' });
    
                return next(resolve(decoded));
            });
        });
    }
}
