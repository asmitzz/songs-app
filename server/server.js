const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeDB } = require("./mongoose")

// import my routes
const userRoutes = require("./routes/user.routes");
const videosRoutes = require("./routes/videos.routes");
const historyRoutes = require("./routes/history.routes");
const watchlaterRoutes = require("./routes/watchlater.routes");
const playlistsRoutes = require("./routes/playlists.routes");

// config env 
dotenv.config();

// initialize DB
initializeDB(process.env.URI);

// port
const port = process.env.PORT || 5000;


// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes

app.get('/',(req,res) => {
   res.send("server is running")
})

app.use((err,req,res,next) => {
   console.error(err.stack)
   res.status(500).json({ success: false, message:"route not found on server" ,error:err.message})
})

// my routes
app.use("/api",userRoutes);
app.use("/api",videosRoutes);
app.use("/api",historyRoutes);
app.use("/api",watchlaterRoutes);
app.use("/api",playlistsRoutes);

app.listen(port,() => console.log("server listening on port : ",port))
