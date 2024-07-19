import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://tarsinterstellar010:ApGojush3u6uIo2c@cluster0.hrod5ba.mongodb.net/blogs"
  );
  console.log("DB Connected");
};
