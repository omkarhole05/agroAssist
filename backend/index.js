import express from 'express'
import dotenv from 'dotenv';
import agmarknetRoutes from './routes/agro.route.js';
import cors from 'cors';


dotenv.config();
const app = express()

const PORT = process.env.PORT;

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}))

app.get('/', (req, res) => {
    res.send('Hello world')
})

//routes
app.use("/api/agmarknet", agmarknetRoutes);


app.listen( PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})