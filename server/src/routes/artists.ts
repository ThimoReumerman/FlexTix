import express, {Application, Request, Response, NextFunction, Router, request} from 'express';

// Import Artist model
import Artist, {IArtist} from "../models/Artist";

var router: Router = express.Router();

// Get all artists
router.get("/", async (req: Request, res: Response) => {
    try {
        const artists: IArtist[] = await Artist.find();
    
        return res.status(200).json(artists);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Get one artist
router.get("/:_id", async (req: Request, res: Response) => {

    // Try getting one artist from the database
    try {
        const artist: IArtist[] = await Artist.findOne({_id: req.params._id});
    
        return res.status(200).json(artist);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Create new artist
router.post("/", async (req: Request, res: Response) => {

    // Create new artist variable
    const artist = new Artist(req.body);

    // Try saving the artist to the database
    try {
        const savedArtist = await artist.save();
    
        return res.sendStatus(200).json(savedArtist);
    } catch (err) {
        return res.sendStatus(400).send("Couldn't save artist.")
    }
});

export default router;