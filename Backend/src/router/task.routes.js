import express from "express";
import {
  createTask,
  getTask,
  updateTask
} from "../controller/task.controller.js";
const router = express.Router();

router.route("/createTask/:id").post(createTask);
router.route("/getTask").get(getTask);
router.route("/updateTask/:id").patch(updateTask);

export default router;
