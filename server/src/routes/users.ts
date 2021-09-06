import express, {Application, Request, Response, NextFunction, Router, request} from 'express';

// Import User model
import User, {IUser} from "../models/User";

// Set router
var router: Router = express.Router();

// Create new user
router.post("/", async (req: Request, res: Response) => {

    // Create new user variable
    const user = new User(req.body);

    // Try saving the user to the database
    try {
        const savedUser = await user.save();
    
        return res.status(200).json(savedUser);
    } catch (err) {
        return res.status(400).send("Couldn't save user.")
    }
});

// Get all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
    
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Get one user
router.get("/:_id", async (req: Request, res: Response) => {

    // Try getting one user from the database
    try {
        const user: IUser[] = await User.findOne({_id: req.params._id});
    
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).send("Something went wrong.");
    }
});

// Update user
router.put("/:_id", async (req: Request, res: Response) => {

    try {
        // Create the updated user variable
        const user: IUser = req.body;

        const updatedUser = await User.findOneAndUpdate({_id: req.params._id}, user);

        return res.status(200).json(updatedUser);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update user");
    }
});

// Delete user
router.delete("/:_id", async (req: Request, res: Response) => {

    // Try deleting user from database
    try {
        const deletedUser = await User.findOneAndDelete({_id: req.params._id});

        return res.status(200).json(deletedUser);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Couldn't update user");
    }
});

export default router;