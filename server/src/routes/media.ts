import express, {Application, Request, Response, NextFunction, Router, request} from 'express';

// Import Media model
import Media, {IMedia} from "../models/Media";

// Set router
var router: Router = express.Router();

// Create new media
router.post("/", async (req: Request, res: Response) => {

    // Create new media variable
    const media = new Media(req.body);

    // Try saving the media to the database
    try {
        const savedMedia = await media.save();
    
        return res.status(200).json(savedMedia);
    } catch (err) {
        return res.status(400).send("Couldn't save media.")
    }
});

// Get all medias
router.get("/", async (req: Request, res: Response) => {
    try {
        const medias: IMedia[] = await Media.find();
    
        return res.status(200).json(medias);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Get one media
router.get("/:_id", async (req: Request, res: Response) => {

    // Try getting one media from the database
    try {
        const media: IMedia[] = await Media.findOne({_id: req.params._id});
    
        return res.status(200).json(media);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Update media
router.put("/:_id", async (req: Request, res: Response) => {

    try {
        // Create the updated media variable
        const media: IMedia = req.body;

        const updatedMedia = await Media.findOneAndUpdate({_id: req.params._id}, media);

        return res.status(200).json(updatedMedia);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update media");
    }
});

// Delete media
router.put("/:_id", async (req: Request, res: Response) => {

    // Try deleting media from database
    try {
        const deletedMedia = await Media.findOneAndDelete({_id: req.params._id});

        return res.status(200).json(deletedMedia);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update media");
    }
});

export default router;