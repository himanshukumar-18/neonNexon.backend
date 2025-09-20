import { app } from "./app.js";
import connectDB from "./db/index.database.js";
import dotenv from "dotenv"


dotenv.config({ path: "./.env" })

const port = process.env.PORT || 5000

connectDB()
    .then(() => {
        // Start server only after successful DB connection
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`)
        })
        // Handle server errors
        app.on("error", (error) => {
            console.error("❌ Server Error:", error);
            throw error;
        })
    })
    .catch((error => {
        console.error("❌ MongoDB Connection Failed:", error)
    }))