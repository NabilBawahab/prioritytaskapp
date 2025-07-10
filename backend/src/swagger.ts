const swaggerJSDoc = require("swagger-jsdoc");

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Priority Task App",
      version: "1.0.0",
    },
    servers: [{ url: `${process.env.URL_SWAGGER}/api` }],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
});
