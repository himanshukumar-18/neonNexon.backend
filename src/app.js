import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import setupSocket from "./function/socket.js"; // ✅ Socket.IO setup

// Routers
import userRouter from "./routes/neonNexa.user.route.js";

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO on the same server
setupSocket(server);

// ✅ Global Middlewares
app.use(cors({
    origin: "*", // ⚠️ Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/neonNexa/users", userRouter);

// ✅ Health Check Route (useful for testing)
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 NeonNexa API is running successfully!",
    });
});

export { app, server };
