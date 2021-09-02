import express, {Application, Request, Response, NextFunction, Router, request} from 'express';

// Import Artist model
import Artist, {IArtist} from "../models/Artist";

// Set router
var router: Router = express.Router();

// Create new artist
router.post("/", async (req: Request, res: Response) => {

    // Create new artist variable
    const artist = new Artist(req.body);

    // Try saving the artist to the database
    try {
        const savedArtist = await artist.save();
    
        return res.status(200).json(savedArtist);
    } catch (err) {
        return res.status(400).send("Couldn't save artist.")
    }
});

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

// Update artist
router.put("/:_id", async (req: Request, res: Response) => {

    try {
        // Create the updated artist variable
        const artist: IArtist = req.body;

        const updatedArtist = await Artist.findOneAndUpdate({_id: req.params._id}, artist);

        return res.status(200).json(updatedArtist);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update artist");
    }
});

// Delete artist
router.put("/:_id", async (req: Request, res: Response) => {

    // Try deleting artist from database
    try {
        const deletedArtist = await Artist.findOneAndDelete({_id: req.params._id});

        return res.status(200).json(deletedArtist);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update artist");
    }
});

export default router;