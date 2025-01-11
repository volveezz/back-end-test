import Express from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

export const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    servers: [{ url: '/api/v1' }]
  },
  apis: ['./src/delivery/http/v1/handlers/**/*.ts', './src/domain/entity/**/*.ts'],
};

export const buildSwagger = () => {
  const swagger = Express.Router();

  const openapiSpecification = swaggerJSDoc(options);

  swagger.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
  swagger.get('/swagger.json', (req, res) => {
    res.status(200).json(openapiSpecification);
  });

  return swagger;
};
