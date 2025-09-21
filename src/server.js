import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { logger } from './middlewares/logger.js';
import router from './routers/index.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());
  app.use(cookieParser());
  app.use('/api-docs', swaggerDocs());
  // app.use(logger);

  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
