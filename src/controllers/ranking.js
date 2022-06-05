import { generateRanking } from '../services/gamification/ranking'; 

export function createRanking(request, response, next){
    const {
        query = {},
    } = request;

    return generateRanking(query.page ?? 1)
        .then(ranking => response.status(200).send(ranking));
}