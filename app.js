const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const { urlencoded } = require("express");
const cloudinary = require("cloudinary");
const path = require("path");

const app = express();

dotenv.config({ path: "./config/config.env" });
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

//set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//accessing routes
app.use(require("./routes/userRoute"));

//connectin database
connectDB();

//accessing client/build/index.html
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
