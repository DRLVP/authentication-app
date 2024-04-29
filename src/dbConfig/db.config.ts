import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Mongodb connected successfully");
            
        });
        connection.on("error",(error)=>{
            console.log("MongoDB connection error", error);
            process.exit()
        })
    } catch (err) {
        console.log("error in connect in database", err);
        throw err;
    }
}