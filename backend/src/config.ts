import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error: any){
        if ( error instanceof Error) {
            console.log(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}