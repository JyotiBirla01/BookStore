// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "API documentation for the bookstore app",
    },
    servers: [
      {
        url: "http://localhost:5000", // Adjust if needed
      },
    ],
    components: { // add this to support JWT:
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [
  {
    bearerAuth: [],
  },
],

  },
  apis: ["./routes/*.js", "./swaggerDocs.js"], // << Important: Add all files with Swagger comments
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
