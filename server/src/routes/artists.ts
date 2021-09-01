import express, {Application, Request, Response, NextFunction, Router, request} from 'express';
import connection from '../mongoose';

// Import Artist model
import Artist, {IArtist} from "../models/Artist";
import mongoose from '../mongoose';

var router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Get");
    mongoose.get("artists")
});

router.post("/", async (req: Request, res: Response) => {

    // Create new artist variable
    const artist = new Artist(req.body);

    // Try saving the artist to the database
    try {
        const savedArtist = await artist.save();
    
        res.sendStatus(200).json(savedArtist);
    } catch (err) {
        res.sendStatus(400).send("Couldn't save artist.")
    }
});

export default router;