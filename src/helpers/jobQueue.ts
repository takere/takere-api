import NodeProcessCore = require("../core/nodeProcessCore");
const Agenda = require("agenda");
const ag = new Agenda({ db: { address: process.env.MONGODB_URI, collection: 'jobs' } });
const isBefore = require('date-fns/isBefore')

const jobQueue = () => {
    const nodeProcess = new NodeProcessCore();
    ag.start();

    ag.define("TIME_TICKER", async (job: any) => {
        try{
            const finishDateIsBeforeToday = isBefore(new Date(), new Date(job.attrs.endDate));
            if(finishDateIsBeforeToday) {
                await nodeProcess.process(job.attrs.data);
            } else {
                await job.disable();
                console.log("Successfully removed job from collection");
            }
        } catch (e) {
            console.log(e)
        }
    });

    ag.on("start", (job: any) => {
        console.log("Job %s starting on node %s", job.attrs.name, job.attrs.data._id);
    });

    ag.on("complete", (job: any) => {
        console.log(`Job ${job.attrs.name} finished on node ${job.attrs.data._id}`);
    });
};


module.exports = {
    jobQueue,
    ag
}
