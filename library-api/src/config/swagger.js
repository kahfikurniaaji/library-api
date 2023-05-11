import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Libraries API",
      version: "1.0.0",
      description: "Libraries API",
      contact: {
        name: "Kahfi Kurnia Aji",
        email: "kahfikurniaaji@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/route/*.js"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
