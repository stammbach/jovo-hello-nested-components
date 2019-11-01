'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const First = require('./components/First');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);

app.useComponents(
    new First()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.ask('Hello from the app! Say hello!');
    },

    HelloWorldIntent() {
        return this.delegate('First', {
            onCompletedIntent: 'CALLBACK'
        });
    },

    CALLBACK() {
        const response = this.$components.First.$response;
        console.log('Got an Response from First', JSON.stringify(response, null, 4));
        return this.tell('Got an callback from the first component! Goodbye!');
    },
});

module.exports.app = app;
