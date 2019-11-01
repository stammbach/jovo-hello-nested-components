module.exports = {
  Nested: {
    START() {
      return this.ask('Welcome to the nested component! Say hello!');
    },

    HelloWorldIntent() {
      return this.toStateIntent('Test', 'START');
    },

    BYE() {
      return this.followUpState('Test.End').ask('Do you really want to go now? You\'ve come so far.');
    },

    Test: {
      START() {
        return this.ask('Welcome to the test state inside the nested component! Say hello!');
      },

      HelloWorldIntent() {
        return this.sendComponentResponse({
          status: 'SUCCESSFUL',
          data: {},
        });
      },

      GoodbyeWorldIntent() {
        return this.toStatelessIntent('BYE');
      },

      Unhandled() {
        return this.ask('Unhandled from test state on nested component, sorry!');
      },

      End: {
        GoodbyeWorldIntent() {
          return this.tell('Okay, goodbye then.');
        },

        Unhandled() {
          return this.ask('Unhandled from test.end state on nested component, sorry!');
        },  
      }
    },

    Unhandled() {
      return this.ask('Unhandled from nested component, sorry!');
    },

    // Handle Component End
    END() {
      return this.sendComponentResponse({
        status: 'REJECTED'
      });
    },

    // Handle Component Error
    ON_ERROR() {  
      return this.sendComponentResponse({
        status: 'ERROR',
        error: this.$handleRequest.error,
      });
  },
  },
};