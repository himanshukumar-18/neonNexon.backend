import Stats from "../model/statsModel.js";

// ✅ Get current stats
export const getStats = async () => {
    let stats = await Stats.findOne();
    if (!stats) {
        stats = await Stats.create({
            activeUsers: 0,
            quizzesCompleted: 0,
            gamesPlayed: 0,
        });
    }
    return stats;
};

// ✅ Increment active users
export const incrementUsers = async () => {
    const stats = await getStats();
    stats.activeUsers += 1;
    await stats.save();
    return stats;
};

// ✅ Decrement active users
export const decrementUsers = async () => {
    const stats = await getStats();
    if (stats.activeUsers > 0) stats.activeUsers -= 1;
    await stats.save();
    return stats;
};

// ✅ Update stats periodically (example)
export const updateStats = async () => {
    const stats = await getStats();
    stats.gamesPlayed += Math.floor(Math.random() * 2); // mock example
    stats.quizzesCompleted += Math.floor(Math.random() * 3);
    await stats.save();
    return stats;
};
