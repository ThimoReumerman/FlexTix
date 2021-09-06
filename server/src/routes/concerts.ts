import express, {Application, Request, Response, NextFunction, Router, request} from 'express';

// Import Concert model
import Concert, {IConcert} from "../models/Concert";
import mongoose from '../mongoose';

// Set router
var router: Router = express.Router();

// Create new concert
router.post("/", async (req: Request, res: Response) => {

    // Create new concert variable
    const concert: mongoose.Document<IConcert> = new Concert(req.body);

    // Try saving the concert to the database
    try {
        const savedConcert = await concert.save();
    
        return res.status(200).json(savedConcert);
    } catch (err) {
        return res.status(400).send("Couldn't save concert.")
    }
});

// Get all concerts
router.get("/", async (req: Request, res: Response) => {
    try {
        const concerts: IConcert[] = await Concert.find();
    
        return res.status(200).json(concerts);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Get one concert
router.get("/:_id", async (req: Request, res: Response) => {

    // Try getting one concert from the database
    try {
        const concert: IConcert[] = await Concert.findOne({_id: req.params._id});
    
        return res.status(200).json(concert);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Update concert
router.put("/:_id", async (req: Request, res: Response) => {

    try {
        // Create the updated concert variable
        const concert: IConcert = req.body;

        const updatedConcert = await Concert.findOneAndUpdate({_id: req.params._id}, concert);

        return res.status(200).json(updatedConcert);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update concert");
    }
});

// Delete concert
router.delete("/:_id", async (req: Request, res: Response) => {

    // Try deleting concert from database
    try {
        const deletedConcert = await Concert.findOneAndDelete({_id: req.params._id});

        return res.status(200).json(deletedConcert);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update concert");
    }
});

export default router;