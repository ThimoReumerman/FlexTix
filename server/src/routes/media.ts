import express, {Application, Request, Response, NextFunction, Router, request} from 'express';
import mongoose from 'mongoose';

// Import Media model
import Media, {IMedia} from "../models/Media";

import upload from "../middleware/upload";
import mediaPath from '../mediaPath';

// Set router
var router: Router = express.Router();

// Create new media
router.post("/", upload.single("upload"), async (req: Request, res: Response) => {

    // Extract media from body
    let mediaBody: IMedia = req.body;

    mediaBody.path = `${mediaPath}${req.file!.filename!}`;

    // Create new media variable
    const media: mongoose.Document<IMedia> = new Media(mediaBody);

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
        // Extract media from body
        let mediaBody: IMedia = req.body;
        mediaBody.path = `${mediaPath}/${req.file!.filename!}`;

        // Create the updated media variable
        const media: IMedia = mediaBody;

        const updatedMedia = await Media.findOneAndUpdate({_id: req.params._id}, media);

        return res.status(200).json(updatedMedia);
    } catch (err) {

        return res.status(400).send("Couldn't update media");
    }
});

// Delete media
router.delete("/:_id", async (req: Request, res: Response) => {

    // Try deleting media from database
    try {
        const deletedMedia = await Media.findOneAndDelete({_id: req.params._id});

        return res.status(200).json(deletedMedia);
    } catch (err) {
        return res.status(400).send("Couldn't update media");
    }
});

export default router;