import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { id: userId } = req.params;

  console.log("task called", req.body, req.params);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid or missing User Id.");
  }

  if (!name) {
    throw new ApiError(400, "Task name is required.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found.");
  }

  const task = await Task.create({ name, description, user });

  if (!task) {
    throw new ApiError(400, "Task not created.");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { task: { name: user.name, id: user._id }, name, description, taskId:task.id, name:task.name, description:task.description, status:task.status },
        "Task created successfully"
      )
    );
});

const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}, "name description status user")
    .populate("user", "name _id")
    .sort({ createdAt: -1 });

  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No task found");
  }

  const statusMapping = {
    Pending: "af1",
    InProgress: "af2",
    Completed: "af3",
    OnHold: "af4",
  };

  const INITIAL_DATA = [
    { id: "af1", label: "Pending", items: [], tint: 1 },
    { id: "af2", label: "InProgress", items: [], tint: 2 },
    { id: "af3", label: "Completed", items: [], tint: 3 },
    { id: "af4", label: "OnHold", items: [], tint: 4 },
  ];

  const transformedTasks = INITIAL_DATA.map((category) => ({
    ...category,
    items: tasks
      .filter((task) => statusMapping[task.status] === category.id)
      .map((task) => ({
        id: task._id.toString(),
        name: task.name,
        description: task.description,
        user: task.user
          ? {
              _id: task.user._id,
              name: task.user.name,
            }
          : null,
      })),
  }));

  res
    .status(200)
    .json(new ApiResponse(200, { data: transformedTasks }, "All Task found."));
});

const updateTask = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate(
    { _id: taskId },
    { status },
    { new: true, runValidators: true, overwrite: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }
  res.status(200).json(new ApiResponse(200, task, "Task found successfully."));
});

export { createTask, getTask, updateTask };
