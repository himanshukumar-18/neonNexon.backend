import { Server } from "socket.io";
import {
    incrementUsers,
    decrementUsers,
    updateStats,
} from "../controller/stocks.dashboard.controller.js";

let updateInterval = null;

// ✅ Initialize and manage Socket.IO connections

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Replace with frontend URL in production
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", async (socket) => {
        console.log(`🟢 User connected: ${socket.id}`);

        try {
            const stats = await incrementUsers(); // returns stats object
            io.emit("statsUpdate", stats);
        } catch (error) {
            console.error("Error incrementing users:", error);
        }

        /**
         * ✅ Start global update interval
         * Only runs once — handles simulated updates (for demo/testing)
         */
        if (!updateInterval) {
            updateInterval = setInterval(async () => {
                try {
                    // ⚠️ updateStatsAPI is an Express handler (req, res)
                    // We'll refactor this so it works properly for socket use:
                    const updatedStats = await updateStats(); // must return stats object
                    io.emit("statsUpdate", updatedStats);
                } catch (error) {
                    console.error("Error updating stats:", error);
                }
            }, 5000);
        }

        /**
         * ✅ Handle user disconnection
         */
        socket.on("disconnect", async () => {
            console.log(`🔴 User disconnected: ${socket.id}`);

            try {
                const stats = await decrementUsers();
                io.emit("statsUpdate", stats);
            } catch (error) {
                console.error("Error decrementing users:", error);
            }

            // Stop interval if no clients remain
            if (io.engine.clientsCount === 0 && updateInterval) {
                clearInterval(updateInterval);
                updateInterval = null;
            }
        });
    });

    return io;
};

export default setupSocket;
