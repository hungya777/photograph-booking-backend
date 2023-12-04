const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Photography Booking API',
    description: 'Description'
  },
  host: "localhost:3000",
  schemes : ['https','http'],
  securityDefinitions : {
    apiKeyAuth : {
        type : 'apiKey',
        in : 'header',
        name : 'Authorization',
        description : '加上 JWT token: Bearer [token]',
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);