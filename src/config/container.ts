import { Container } from 'inversify';
// * SERVIÇOS
import { UserService } from '../services/users'; 
import { PlaceService } from '../services/places'; 
import { PasswordService } from '../services/password'; 
import { MarkerService } from '../services/marker'; 
import { CommentsService } from '../services/comments'; 
import { TokenService } from '../services/authenticate/token'; 
import { AchievementService } from '../services/gamification/achievement'; 
import { ActionService } from '../services/gamification/action'; 
import { InformationAmountService } from '../services/gamification/information-amount'; 
import { LevelService } from '../services/gamification/level'; 
import { RankingService } from '../services/gamification/ranking'; 
import { EmailService } from '../services/email';
// * MIDDLEWARES
import { MiddlewaresService } from '../middlewares/middlewares';

const container = new Container();
container.bind<UserService>(UserService).toSelf();
container.bind<PlaceService>(PlaceService).toSelf();
container.bind<PasswordService>(PasswordService).toSelf();
container.bind<MarkerService>(MarkerService).toSelf();
container.bind<CommentsService>(CommentsService).toSelf();
container.bind<TokenService>(TokenService).toSelf();
container.bind<AchievementService>(AchievementService).toSelf();
container.bind<ActionService>(ActionService).toSelf();
container.bind<InformationAmountService>(InformationAmountService).toSelf();
container.bind<LevelService>(LevelService).toSelf();
container.bind<RankingService>(RankingService).toSelf();
container.bind<EmailService>(EmailService).toSelf();
container.bind<MiddlewaresService>(MiddlewaresService).toSelf();


export default container;