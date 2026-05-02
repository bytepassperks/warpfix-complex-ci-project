import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { healthRouter } from './routes/health';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

// Intentional lint issue: no-console
console.log("Starting server...");

// Intentional: unused variable
var unusedConfig = { timeout: 5000 };

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
