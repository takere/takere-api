const cron = require('node-cron');
const sanar = require('./../routes/news/sanarScraper');
const medScape = require('./../routes/news/medScapeScraper');
const News = require('./../models/News');
const logger = require('../helpers/logger');

const everyFiveHours = '* */5 * * *';

const cronJobs = () => {
    logger.debug(`Started Cron: ${everyFiveHours}`);
    cron.schedule(everyFiveHours, async () => {
        await getNews();
    });
}


module.exports = {
    cronJobs
}

async function getNews () {
    const sanarData = await sanar.getSanarMedicalNews();
    const medScapeData = await medScape.getMedScapeMedicalNews();

    const data = [...sanarData, ...medScapeData];

    for (const d of data) {
        try {
            await News.createNews({
                pageName: d.siteName,
                url: d.url,
                title: d.title,
                description: d.description,
                image: d.images[0]
            });
        } catch (e) {
            logger.error(e);
        }
    }
}
