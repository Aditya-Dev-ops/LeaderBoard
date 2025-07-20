import express from "express";

const router = express.Router();

import {getUsers , getLeaderboard , addUser , claimPoints} from "../controllers/userController.js"

router.get("/users", getUsers);
router.post("/users", addUser);
router.post("/claim", claimPoints);
router.get("/leaderboard", getLeaderboard);

export default  router;