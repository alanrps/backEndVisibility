import { generateRanking } from '../services/gamification/ranking'; 

export function createRanking(request, response, next){
    return generateRanking()
        .then(ranking => response.status(200).send(ranking));
}