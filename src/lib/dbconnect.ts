import { log } from "console"
import mongoose from "mongoose"
import { exit } from "process"


type ConnectionObj ={
    isConnected ?:number
}

const connection : ConnectionObj = {}

async function connectDB(): Promise<void> {
    
    if (connection.isConnected) {
        console.log("Already connected to the Database");
        return
    }

    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI || '',{})
       console.log("db got ", db);
       connection.isConnected = db.connections[0].readyState
       console.log("Data base connected...");

    } catch (error) {
        console.log("Database connection failed",error);
        process.exit(1)
    }
}

export default connectDB;