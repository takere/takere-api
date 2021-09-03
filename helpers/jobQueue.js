const Agenda = require("agenda");
const ag = new Agenda({ db: { address: process.env.MONGODB_URI, collection: 'jobs' } });
const nodeProcess = require('../core/nodeProcessCore');

const jobQueue = () => {
    ag.start();

    ag.define("TIME_TICKER", async (job) => {
        await nodeProcess.process(job.attrs.data);
    });

    ag.on("start", (job) => {
        console.log("Job %s starting on node %s", job.attrs.name, job.attrs.data._id);
    });

    ag.on("complete", (job) => {
        console.log(`Job ${job.attrs.name} finished on node ${job.attrs.data._id}`);
    });
};


module.exports = {
    jobQueue,
    ag
}
