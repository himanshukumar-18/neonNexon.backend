import dotenv from "dotenv";
import { app, server } from "./app.js";
import connectDB from "./db/index.database.js";

// ✅ Load environment variables early
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

/**
 * 🚀 Connect to MongoDB and start the server
 */
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`✅ Server running at: http://localhost:${PORT}`);
        });

        // ✅ Handle server-level errors gracefully
        server.on("error", (error) => {
            console.error("❌ Server Error:", error.message);
            process.exit(1); // Safe exit
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit process on DB failure
    });
