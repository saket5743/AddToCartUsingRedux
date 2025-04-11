import mongoose from "mongoose";

const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/ADD_TO_CART?retryWrites=true&w=majority&appName=Cluster0"
  );
};

export default connectDB;
