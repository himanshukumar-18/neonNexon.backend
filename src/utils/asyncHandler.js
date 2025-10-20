const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (next) return next(error);
            console.error("Unhandled async error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
export default asyncHandler;
