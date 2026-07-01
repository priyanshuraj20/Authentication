// to connect to db and start the server
import app from "./src/app.js";

import connectDb from "./src/config/database.js";


    connectDb();

   


app.listen(3000,()=>{
    console.log("Server is started")
})


