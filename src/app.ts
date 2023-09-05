import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//TODO: Importar e add as rotas ao server

app.get('/health', async (req: Request, res: Response) => {
  res.send('I am okay!');
});

export default app;
