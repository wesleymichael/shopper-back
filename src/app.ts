import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routers/index.router.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', async (req: Request, res: Response) => {
  res.send('I am okay!');
});

export default app;
