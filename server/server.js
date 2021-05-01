const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user.routes");
const videosRoutes = require("./routes/videos.routes");

const { initializeDB } = require("./mongoose")

dotenv.config();

const port = process.env.PORT || 5000;

initializeDB(process.env.URI);

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
   res.send("server is running")
})

app.use((err,req,res,next) => {
   console.error(err.stack)
   res.status(500).json({ success: false, message:"route not found on server" ,error:err.message})
})

app.use("/api",userRoutes);
app.use("/api",videosRoutes);

app.listen(port,() => console.log("server listening on port : ",port))
