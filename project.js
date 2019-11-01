// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
       nlu: 'alexa',
       skillId: '<YOUR-SKILL-ID>',
    },
    googleAction: {
       nlu: 'dialogflow',
    },
    endpoint: '${JOVO_WEBHOOK_URL}',
};