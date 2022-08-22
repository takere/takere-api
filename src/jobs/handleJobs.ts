// const externalLink = require('./externalLink');
// const dataInput = require('./dataInput');
// const motivational = require('./motivacional');
import Reminder = require("./reminder");

const JOB_TYPES = {
    DATA_INPUT: "DATA_INPUT",
    EXTERNAL_LINK: "EXTERNAL_LINK",
    MOTIVATIONAL: "MOTIVATIONAL",
    REMINDER: "REMINDER_NODE"
}

const handleJob = async (jobName: string, jobId: string, data: any, flowId: string) => {
    //const reminder = require('./reminder');
    const reminder = new Reminder();

    switch (jobName) {
        // case JOB_TYPES.EXTERNAL_LINK:
        //     await externalLink.handler(data, jobId, flowId)
        //     break;
        // case JOB_TYPES.DATA_INPUT:
        //     await dataInput.handler(data, jobId, flowId)
        //     break;
        // case JOB_TYPES.MOTIVATIONAL:
        //     await motivational.handler(data, jobId, flowId);
        //     break;
        case JOB_TYPES.REMINDER:
            await reminder.handler(data, jobId, flowId);
            break;
    }
}


module.exports = {
    JOB_TYPES,
    handleJob
}
