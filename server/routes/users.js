import express from "express";
import {
    getUsers,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/:id", verifyToken, getUsers);
router.get("/:is/friends", verifyToken, getUserFriends);


// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;