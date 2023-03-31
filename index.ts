
import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
const api = express();

import cors from 'cors';
import { CronJob } from 'cron';
import routes from './routes';
import knex from './database';


const jobWeekly = new CronJob('00 00 * * * 0', async () => {
    console.info('tarefa semanal agendada');
    return knex({ ia: 'information_amount' })
        .update({ weekly_points: 0 });
}, null, true, 'America/Sao_Paulo');

const { PORT } = process.env;

api.use(json());
api.use(cors());
api.use('/', routes);
api.listen(PORT || 3000);

console.log(`Back-end execute in ${PORT}`);
