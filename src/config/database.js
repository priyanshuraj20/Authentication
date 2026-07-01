import mongoose from 'mongoose'

import config from "./config.js"

async function connectDb(){
    await mongoose.connect(config.MONGO_URI)
    console.log("DB connected Successfully!")
}

export default connectDb;