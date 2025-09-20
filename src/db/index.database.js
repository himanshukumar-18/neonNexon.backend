import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {

        const connectionDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n✅ Connection Successful! DB Host: ${connectionDB.connection.host}`);

    } catch (error) {
        console.error("Error: ", error)
        process.exit(1)
    }
}

export default connectDB;
