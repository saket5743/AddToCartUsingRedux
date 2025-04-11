import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  if (!user) {
    throw new ApiError(400, "User not created");
  }
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: { name: user.name, id: user._id, email: user.email }, token },
        "User created successfully."
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(404, "Please provide both email and password.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid Credential.");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(404, "Invalid Credential");
  }

  const token = user.createJWT();

  res
    .status(200)
    .json(new ApiResponse(200, { user: { name: user.name, id:user.id }, token }));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(404, "Please provide both email and password.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Invalid Credential.");
  }
  res
    .clearCookie("token")
    .status(200)
    .json(new ApiResponse(200, { user: user.email }, "Logout Successfully."));
});

const userGet = asyncHandler(async(req,res)=>{
  const user = await User.find({});
  if(!user){
    throw new ApiError(404, "User's not found.")
  }
  res.status(404).json(new ApiResponse(404, {user:user.email, user:user.password}, "User's found successfully."))
});

const userById = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const user = await User.findById({_id:id});
  if(!user){
    throw new ApiError(404, "User not found.")
  }
  res.status(404).json(new ApiResponse(404, {user:user.email, user:user.password}, "User found successfully."))
})

export { registerUser, loginUser, logoutUser, userGet, userById };
