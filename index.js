require('dotenv').config();
const api = require('express')();
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');

const knex = require('./database');
const CronJob = require('cron').CronJob;

const jobWeekly = new CronJob('00 00 * * * 0', async () => {
    console.info('tarefa semanal agendada');
    return knex({ ia: 'information_amount' })
        .update({ weekly_points: 0 });
}, null, true, 'America/Sao_Paulo');

const { PORT } = process.env;

api.use(json());
api.use(cors());
api.use(routes);
api.listen(PORT || 3000);

// eslint-disable-next-line no-console
console.log(`Back-end execute in ${PORT}`);
