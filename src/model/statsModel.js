import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    activeUsers: { type: Number, default: 0 },
    quizzesCompleted: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
}, { timestamps: true });

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
