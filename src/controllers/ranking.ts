import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { RankingService } from '../services/gamification/ranking';

interface RankingController {
    create(request: Request, response: Response, next: NextFunction);
}

// ! VERIFICAR SE POSSO TORNAR AS INTERFACES GLOBAIS PARA PASSAR OS TIPOS PARA A INJEÇÃO E NÃO PRECISAR IMPORTAR
@injectable()
export class RankingControllerImpl implements RankingController {
    private rankingService: RankingService;

    constructor(@inject(RankingService) rankingService: RankingService){
        this.rankingService = rankingService;
    }
    create(request: Request<{},{},{},{ page?: number }>, response: Response, next: NextFunction){
        // ! Verificar quando não passo a query, o que retorna
        const {
            query = {},
        } = request;
    
        return this.rankingService.create(query.page ?? 1)
            .then(ranking => response.status(200).send(ranking))
            .catch(next);
    }
} 
