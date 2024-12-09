import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./utils/database.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";

// Load environment variables from .env file
dotenv.config({
    path: ".env"
});

// Connect to the database
databaseConnection();

// app is created
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent from the frontend
};
app.use(cors(corsOptions));


// Calling "/" route
app.get("/", (req, res) => {
    return res.status(200).json({
        message:"Hello I am coming from backend",
        success:true
    })
}) 

// all api 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
