
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      setupNodeEvents(on, config) {
      return {
        blockHosts: [
            'www.google-analytics.com', 
            'region1.analytics.google.com',
            '*.facebook.com', 
            'google.com/recaptcha', 
            '*.hotjar.io'
        ]
      }
    },
    
    waitForLoad: false, 
    pageLoadTimeout: 60000,
    baseUrl: 'https://ultimateqa.com/',
  },
});