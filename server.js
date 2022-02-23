require("dotenv").config({path: "./config.env"})
const express = require("express")
const app = express()
const connectDB = require("./config/db")
const errorHandler = require("./middleware/error")
const cors = require("cors")

app.use(cors()) 
app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/private", require("./routes/private"))
app.use("/api/client", require("./routes/client"))

connectDB();
app.use(errorHandler)
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{console.log(`Server has been started on ${PORT} port`)});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});