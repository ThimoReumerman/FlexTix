import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import artists from "./routes/artists";

// Configure dotenv
import dotenv from 'dotenv';
dotenv.config();

// Initialize port
const PORT: number = 5000;

// Initalize app
const app: Application = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/artists', artists);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log("Server running"));