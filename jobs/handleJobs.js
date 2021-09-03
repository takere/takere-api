const disease = require('./sendDiseaseInformation');
const motivational = require('./sendMotivacional');
const rem = require('./reminder');

const JOB_TYPES = {
    DISEASE_INFO: "DISEASE_INFO",
    MOTIVATIONAL: "MOTIVATIONAL",
    REMINDER: "REMINDER"
}

const handleJob = (jobName, data) => {
    switch (jobName) {
        case JOB_TYPES.DISEASE_INFO:
            disease.sendDiseaseInfo(data);
            break;
        case JOB_TYPES.MOTIVATIONAL:
            motivational.sendMotivational(data);
            break;
        case JOB_TYPES.REMINDER:
            rem.reminder(data);
            break;
    }
}


module.exports = {
    JOB_TYPES,
    handleJob
}
