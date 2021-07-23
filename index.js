import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


import taskRoutes from './routes/routes.js';

const app = express();

//implies that all routes of this app will reach at
//localhost:5000/task

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

app.use('/task' , taskRoutes);

const CONNECTION_URL = 'mongodb+srv://Rishav:Rishav@123@cluster0.e8mea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser : true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(()=> app.listen(PORT, () => console.log(`Server Running on : ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify' , false);

