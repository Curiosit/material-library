import mongoose, {ConnectOptions} from "mongoose";

let isConnected = false; 

export const connectToDB = async () => {
    console.log("Try connect");
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('mongodb connected');

    }

    try {
        console.log('trying');
        await mongoose.connect(process.env.MONGODB_URI!,
             {family: 4,
            dbName: "material-library",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions)
        
        isConnected = true;
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
        console.log("Connected successfully");
        });
        console.log('mongodb connected');
        return db;
    } catch (error) {
        console.log(error);
    }
    
}