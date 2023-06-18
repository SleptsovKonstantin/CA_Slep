const { CronJob } = require('cron');
const calcUserCount = require('../background/calcUsersCount');


const job = new CronJob('*/3 * * * *', (() => {
  console.log('You will see this message every 3 min');
}), null, true, 'America/Los_Angeles');
job.start();


const calcEmployeeJob = new CronJob('1 1 * * *', (async () => {
// const calcEmployeeJob = new CronJob('* * * * *', (async () => {
  try {
    await calcUserCount();
  } catch (e) {
    console.trace('[calcEmployeeJob ERROR]', e);
  }
}), null, true, 'America/Los_Angeles');
calcEmployeeJob.start();
