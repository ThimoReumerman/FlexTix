import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';

// Import routes
import artists from "./routes/artists";
import concerts from "./routes/concerts";
import users from "./routes/users";

// Configure dotenv
import dotenv from 'dotenv';
dotenv.config();

// Initialize port
const PORT: number = 5000;

// Initalize app
const app: Application = express();

// Body parsing middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/artists', artists);
app.use('/concerts', concerts);


app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log("Server running"));