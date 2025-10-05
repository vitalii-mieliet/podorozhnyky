import { getEnvVar } from '../utils/getEnvVar.js';

const allowedOrigins = getEnvVar('ALLOWED_ORIGINS', '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
