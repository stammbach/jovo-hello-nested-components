module.exports = {
  First: {
    START() {
      return this.ask('Welcome to the first component! Say hello!');
    },

    HelloWorldIntent() {
      return this.delegate('Nested', {
        onCompletedIntent: 'CALLBACK'
      });
    },

    GoodbyeWorldIntent() {
      return this.followUpState('Inner').ask('Don\'t leave now, say hello instead!');
    },

    Inner: {
      HelloWorldIntent() {
        return this.delegate('Nested', {
          onCompletedIntent: 'CALLBACK'
        });
      },

      CALLBACK() {
        const response = this.$components.Nested.$response;
        console.log('Got an Response from Nested', JSON.stringify(response, null, 4));
        return this.followUpState('Success').ask('Got an callback inside the inner state from the nested component! Say hello!');
      },

      Unhandled() {
        return this.ask('Unhandled from inner state on first component, sorry!');
      },
    },

    CALLBACK() {
      const response = this.$components.Nested.$response;
      console.log('Got an Response from Nested', JSON.stringify(response, null, 4));
      return this.followUpState('Success').ask('Got an callback from the nested component! Say hello!');
    },

    Success: {
      HelloWorldIntent() {
        return this.sendComponentResponse({
          status: 'SUCCESSFUL',
          data: {},
        });
      },

      Unhandled() {
        return this.ask('Unhandled from success state on first component, sorry!');
      },
    },

    Unhandled() {
      return this.ask('Unhandled from first component, sorry!');
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