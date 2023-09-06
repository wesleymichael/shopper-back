import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routers/index.router.ts';

const app = express();
app.use(express.json());
app.use(cors());

//TODO: Importar e add as rotas ao server
app.use(router);

app.get('/health', async (req: Request, res: Response) => {
  res.send('I am okay!');
});

export default app;
