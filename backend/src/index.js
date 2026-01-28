import express from 'express'
import { databaseInit } from './db/sequelizer/sequelizer.js';
import { Superhero } from './db/models/SuperheroModel.js';
import { getEnvVar } from './utils/getEnvVar.js';


const app = express()

const PORT = Number(getEnvVar('DB_PORT','5432'));


async function startServer (req, res){
    try {
      await databaseInit();
      console.log("✅ Database successfully initialized");
    } catch (err) {
      console.error(
        "❌ Failed to start the server: Database initialization error.",
        err
      );
    }
};


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

startServer()