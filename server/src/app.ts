import express, {Application, Request, Response, NextFunction} from 'express';

const PORT: number = 5000;

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log("Server running"));