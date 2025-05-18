import mongoose from "mongoose";
const connectDB = async () => {
    try {
      //connect to the Youtube database
      await mongoose.connect("mongodb://localhost:27017/YouTubeDb");
      console.log('Database connected successfully');
    } catch (err) {
    //throw error when connection fail
      console.error(err.message);
    }
  };
export default connectDB; 
